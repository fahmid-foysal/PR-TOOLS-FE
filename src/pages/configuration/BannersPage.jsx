import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { configurationApi } from '../../api/configurationApi.js';
import PageHeader from '../../components/common/PageHeader.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import FormModal from '../../components/modals/FormModal.jsx';
import ConfirmModal from '../../components/modals/ConfirmModal.jsx';

const bannerSchema = z.object({
  image: z.any().refine((file) => file && file[0], 'Image is required'),
});

const BannersPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bannerSchema),
  });

  const watchedImage = watch('image');

  useEffect(() => {
    if (watchedImage && watchedImage[0]) {
      const file = watchedImage[0];
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [watchedImage]);

  const columns = [
    {
      key: 'image',
      label: 'Image',
      sortable: false,
      render: (value) => (
        <img
          src={value}
          alt="Banner"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
  ];

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const data = await configurationApi.getBanners();
      setBanners(data);
    } catch (error) {
      console.log('API not available, using mock data');
      setBanners([
        { id: 1, image: 'https://via.placeholder.com/800x400?text=Banner+1' },
        { id: 2, image: 'https://via.placeholder.com/800x400?text=Banner+2' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingBanner(null);
    reset();
    setPreviewImage(null);
    setModalOpen(true);
  };

  const openEditModal = (banner) => {
    setEditingBanner(banner);
    // For edit, we might need to handle existing image differently
    // For now, assume edit requires re-uploading
    reset();
    setPreviewImage(banner.image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingBanner(null);
    reset();
    setPreviewImage(null);
  };

  const onSubmit = async (data) => {
    if (!data.image || !data.image[0]) {
      toast.error('Please select an image');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('image', data.image[0]);

      if (editingBanner) {
        await configurationApi.updateBanner(editingBanner.id, formData);
        toast.success('Banner updated successfully');
      } else {
        await configurationApi.createBanner(formData);
        toast.success('Banner created successfully');
      }
      closeModal();
      fetchBanners();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (banner) => {
    setBannerToDelete(banner);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setBannerToDelete(null);
  };

  const handleDelete = async () => {
    if (!bannerToDelete) return;
    setSubmitting(true);
    try {
      await configurationApi.deleteBanner(bannerToDelete.id);
      toast.success('Banner deleted successfully');
      closeDeleteModal();
      fetchBanners();
    } catch (error) {
      toast.error('Failed to delete banner');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Banners"
        subtitle="Manage home page banners"
        actions={
          <button
            onClick={openCreateModal}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Banner
          </button>
        }
      />

      <div className="bg-white shadow rounded-lg">
        <DataTable
          columns={columns}
          data={banners}
          loading={loading}
          emptyMessage="No banners found"
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      </div>

      <FormModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingBanner ? 'Edit Banner' : 'Create Banner'}
        onSubmit={handleSubmit(onSubmit)}
        loading={submitting}
      >
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Banner Image
          </label>
          <input
            {...register('image')}
            type="file"
            id="image"
            accept="image/*"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
          )}
          {previewImage && (
            <div className="mt-2">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Banner"
        message="Are you sure you want to delete this banner? This action cannot be undone."
        onConfirm={handleDelete}
        loading={submitting}
        type="danger"
      />
    </div>
  );
};

export default BannersPage;