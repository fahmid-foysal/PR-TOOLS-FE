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

const homePageSectionSchema = z.object({
  section_name: z.string().min(1, 'Section name is required'),
  one_liner: z.string().min(1, 'One liner is required'),
});

const HomePageSectionsPage = () => {
  const [homePageSections, setHomePageSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHomePageSection, setEditingHomePageSection] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [homePageSectionToDelete, setHomePageSectionToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(homePageSectionSchema),
  });

  const columns = [
    { key: 'section_name', label: 'Section Name', sortable: true },
    { key: 'one_liner', label: 'One Liner', sortable: false },
  ];

  useEffect(() => {
    fetchHomePageSections();
  }, []);

  const fetchHomePageSections = async () => {
    try {
      const data = await configurationApi.getHomePageSections();
      setHomePageSections(data);
    } catch (error) {
      console.log('API not available, using mock data');
      setHomePageSections([
        { id: 1, section_name: 'Featured Products', one_liner: 'Check out our best sellers' },
        { id: 2, section_name: 'New Arrivals', one_liner: 'Latest products in stock' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingHomePageSection(null);
    reset({
      section_name: '',
      one_liner: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (homePageSection) => {
    setEditingHomePageSection(homePageSection);
    reset({
      section_name: homePageSection.section_name,
      one_liner: homePageSection.one_liner,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingHomePageSection(null);
    reset();
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editingHomePageSection) {
        await configurationApi.updateHomePageSection(editingHomePageSection.id, data);
        toast.success('Home page section updated successfully');
      } else {
        await configurationApi.createHomePageSection(data);
        toast.success('Home page section created successfully');
      }
      closeModal();
      fetchHomePageSections();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const openDeleteModal = (homePageSection) => {
    setHomePageSectionToDelete(homePageSection);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setHomePageSectionToDelete(null);
  };

  const handleDelete = async () => {
    if (!homePageSectionToDelete) return;
    setSubmitting(true);
    try {
      await configurationApi.deleteHomePageSection(homePageSectionToDelete.id);
      toast.success('Home page section deleted successfully');
      closeDeleteModal();
      fetchHomePageSections();
    } catch (error) {
      toast.error('Failed to delete home page section');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Home Page Sections"
        subtitle="Manage home page sections"
        actions={
          <button
            onClick={openCreateModal}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Section
          </button>
        }
      />

      <div className="bg-white shadow rounded-lg">
        <DataTable
          columns={columns}
          data={homePageSections}
          loading={loading}
          emptyMessage="No home page sections found"
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      </div>

      <FormModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingHomePageSection ? 'Edit Home Page Section' : 'Create Home Page Section'}
        onSubmit={handleSubmit(onSubmit)}
        loading={submitting}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="section_name" className="block text-sm font-medium text-gray-700">
              Section Name
            </label>
            <input
              {...register('section_name')}
              type="text"
              id="section_name"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter section name"
            />
            {errors.section_name && (
              <p className="mt-1 text-sm text-red-600">{errors.section_name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="one_liner" className="block text-sm font-medium text-gray-700">
              One Liner
            </label>
            <input
              {...register('one_liner')}
              type="text"
              id="one_liner"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter one liner description"
            />
            {errors.one_liner && (
              <p className="mt-1 text-sm text-red-600">{errors.one_liner.message}</p>
            )}
          </div>
        </div>
      </FormModal>

      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Home Page Section"
        message={`Are you sure you want to delete "${homePageSectionToDelete?.section_name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        loading={submitting}
        type="danger"
      />
    </div>
  );
};

export default HomePageSectionsPage;