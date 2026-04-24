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

const categorySchema = z.object({
  category_name: z.string().min(1, 'Category name is required'),
});

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const columns = [
    { key: 'category_name', label: 'Category Name', sortable: true },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await configurationApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.log('API not available, using mock data');
      setCategories([
        { id: 1, category_name: 'Smartphones' },
        { id: 2, category_name: 'Laptops' },
        { id: 3, category_name: 'Accessories' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    reset({ category_name: '' });
    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    reset({ category_name: category.category_name });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
    reset();
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingCategory) {
        await configurationApi.updateCategory(editingCategory.id, data);
        toast.success('Category updated successfully');
      } else {
        await configurationApi.createCategory(data);
        toast.success('Category created successfully');
      }
      closeModal();
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    setSubmitting(true);
    try {
      await configurationApi.deleteCategory(categoryToDelete.id);
      toast.success('Category deleted successfully');
      closeDeleteModal();
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Manage product categories"
        actions={
          <button
            onClick={openCreateModal}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Category
          </button>
        }
      />

      <div className="bg-white shadow rounded-lg">
        <DataTable
          columns={columns}
          data={categories}
          loading={loading}
          emptyMessage="No categories found"
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      </div>

      <FormModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingCategory ? 'Edit Category' : 'Create Category'}
        onSubmit={handleSubmit(onSubmit)}
        loading={submitting}
      >
        <div>
          <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            {...register('category_name')}
            type="text"
            id="category_name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter category name"
          />
          {errors.category_name && (
            <p className="mt-1 text-sm text-red-600">{errors.category_name.message}</p>
          )}
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.category_name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        loading={submitting}
        type="danger"
      />
    </div>
  );
};

export default CategoriesPage;