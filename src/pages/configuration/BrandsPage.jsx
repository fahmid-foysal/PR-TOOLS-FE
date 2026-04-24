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

const brandSchema = z.object({
  brand_name: z.string().min(1, 'Brand name is required'),
});

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(brandSchema),
  });

  const columns = [
    { key: 'brand_name', label: 'Brand Name', sortable: true },
  ];

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const data = await configurationApi.getBrands();
      setBrands(data);
    } catch (error) {
      // Mock data for development
      console.log('API not available, using mock data');
      setBrands([
        { id: 1, brand_name: 'Samsung' },
        { id: 2, brand_name: 'Apple' },
        { id: 3, brand_name: 'Google' },
      ]);
      // toast.error('Failed to fetch brands - using mock data');
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingBrand(null);
    reset({ brand_name: '' });
    setModalOpen(true);
  };

  const openEditModal = (brand) => {
    setEditingBrand(brand);
    reset({ brand_name: brand.brand_name });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingBrand(null);
    reset();
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingBrand) {
        await configurationApi.updateBrand(editingBrand.id, data);
        toast.success('Brand updated successfully');
      } else {
        await configurationApi.createBrand(data);
        toast.success('Brand created successfully');
      }
      closeModal();
      fetchBrands();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (brand) => {
    setBrandToDelete(brand);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setBrandToDelete(null);
  };

  const handleDelete = async () => {
    if (!brandToDelete) return;
    setSubmitting(true);
    try {
      await configurationApi.deleteBrand(brandToDelete.id);
      toast.success('Brand deleted successfully');
      closeDeleteModal();
      fetchBrands();
    } catch (error) {
      toast.error('Failed to delete brand');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Brands"
        subtitle="Manage product brands"
        actions={
          <button
            onClick={openCreateModal}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Brand
          </button>
        }
      />

      <div className="bg-white shadow rounded-lg">
        <DataTable
          columns={columns}
          data={brands}
          loading={loading}
          emptyMessage="No brands found"
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      </div>

      <FormModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingBrand ? 'Edit Brand' : 'Create Brand'}
        onSubmit={handleSubmit(onSubmit)}
        loading={submitting}
      >
        <div>
          <label htmlFor="brand_name" className="block text-base font-semibold text-gray-900 mb-2">
            Brand Name
          </label>
          <input
            {...register('brand_name')}
            type="text"
            id="brand_name"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base transition-colors duration-200"
            placeholder="Enter brand name"
          />
          {errors.brand_name && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.brand_name.message}</p>
          )}
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Brand"
        message={`Are you sure you want to delete "${brandToDelete?.brand_name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        loading={submitting}
        type="danger"
      />
    </div>
  );
};

export default BrandsPage;