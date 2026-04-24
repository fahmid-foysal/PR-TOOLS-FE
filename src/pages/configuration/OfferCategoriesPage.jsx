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

const offerCategorySchema = z.object({
  offer_category_name: z.string().min(1, 'Offer category name is required'),
  starting_date: z.string().min(1, 'Starting date is required'),
  expiry_date: z.string().min(1, 'Expiry date is required'),
}).refine((data) => new Date(data.starting_date) < new Date(data.expiry_date), {
  message: 'Expiry date must be after starting date',
  path: ['expiry_date'],
});

const OfferCategoriesPage = () => {
  const [offerCategories, setOfferCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOfferCategory, setEditingOfferCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [offerCategoryToDelete, setOfferCategoryToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(offerCategorySchema),
  });

  const columns = [
    { key: 'offer_category_name', label: 'Offer Category Name', sortable: true },
    {
      key: 'starting_date',
      label: 'Starting Date',
      sortable: true,
      render: (value) => value ? new Date(value).toLocaleDateString() : '-',
    },
    {
      key: 'expiry_date',
      label: 'Expiry Date',
      sortable: true,
      render: (value) => value ? new Date(value).toLocaleDateString() : '-',
    },
  ];

  useEffect(() => {
    fetchOfferCategories();
  }, []);

  const fetchOfferCategories = async () => {
    try {
      const data = await configurationApi.getOfferCategories();
      setOfferCategories(data);
    } catch (error) {
      console.log('API not available, using mock data');
      setOfferCategories([
        { id: 1, offer_category_name: 'Flash Sale', starting_date: '2024-01-01', expiry_date: '2024-12-31' },
        { id: 2, offer_category_name: 'New Year Deal', starting_date: '2024-01-01', expiry_date: '2024-01-31' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingOfferCategory(null);
    reset({
      offer_category_name: '',
      starting_date: '',
      expiry_date: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (offerCategory) => {
    setEditingOfferCategory(offerCategory);
    reset({
      offer_category_name: offerCategory.offer_category_name,
      starting_date: offerCategory.starting_date ? offerCategory.starting_date.split('T')[0] : '',
      expiry_date: offerCategory.expiry_date ? offerCategory.expiry_date.split('T')[0] : '',
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingOfferCategory(null);
    reset();
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingOfferCategory) {
        await configurationApi.updateOfferCategory(editingOfferCategory.id, data);
        toast.success('Offer category updated successfully');
      } else {
        await configurationApi.createOfferCategory(data);
        toast.success('Offer category created successfully');
      }
      closeModal();
      fetchOfferCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (offerCategory) => {
    setOfferCategoryToDelete(offerCategory);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setOfferCategoryToDelete(null);
  };

  const handleDelete = async () => {
    if (!offerCategoryToDelete) return;
    setSubmitting(true);
    try {
      await configurationApi.deleteOfferCategory(offerCategoryToDelete.id);
      toast.success('Offer category deleted successfully');
      closeDeleteModal();
      fetchOfferCategories();
    } catch (error) {
      toast.error('Failed to delete offer category');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Offer Categories"
        subtitle="Manage product offer categories"
        actions={
          <button
            onClick={openCreateModal}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Offer Category
          </button>
        }
      />

      <div className="bg-white shadow rounded-lg">
        <DataTable
          columns={columns}
          data={offerCategories}
          loading={loading}
          emptyMessage="No offer categories found"
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      </div>

      <FormModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingOfferCategory ? 'Edit Offer Category' : 'Create Offer Category'}
        onSubmit={handleSubmit(onSubmit)}
        loading={submitting}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="offer_category_name" className="block text-sm font-medium text-gray-700">
              Offer Category Name
            </label>
            <input
              {...register('offer_category_name')}
              type="text"
              id="offer_category_name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter offer category name"
            />
            {errors.offer_category_name && (
              <p className="mt-1 text-sm text-red-600">{errors.offer_category_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="starting_date" className="block text-sm font-medium text-gray-700">
              Starting Date
            </label>
            <input
              {...register('starting_date')}
              type="date"
              id="starting_date"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.starting_date && (
              <p className="mt-1 text-sm text-red-600">{errors.starting_date.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              {...register('expiry_date')}
              type="date"
              id="expiry_date"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.expiry_date && (
              <p className="mt-1 text-sm text-red-600">{errors.expiry_date.message}</p>
            )}
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Offer Category"
        message={`Are you sure you want to delete "${offerCategoryToDelete?.offer_category_name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        loading={submitting}
        type="danger"
      />
    </div>
  );
};

export default OfferCategoriesPage;