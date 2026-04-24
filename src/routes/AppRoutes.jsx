import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';
import ProtectedRoute from './ProtectedRoute.jsx';
import AdminLayout from '../layout/AdminLayout.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import DashboardPage from '../pages/dashboard/DashboardPage.jsx';
import BrandsPage from '../pages/configuration/BrandsPage.jsx';
import CategoriesPage from '../pages/configuration/CategoriesPage.jsx';
import OfferCategoriesPage from '../pages/configuration/OfferCategoriesPage.jsx';
import HomePageSectionsPage from '../pages/configuration/HomePageSectionsPage.jsx';
import BannersPage from '../pages/configuration/BannersPage.jsx';
const ProductsListPage = () => <div className="p-8"><h1>Products</h1></div>;
const CreateProductPage = () => <div className="p-8"><h1>Create Product</h1></div>;
const ProductDetailsPage = () => <div className="p-8"><h1>Product Details</h1></div>;
const EditProductPage = () => <div className="p-8"><h1>Edit Product</h1></div>;
const HomePageProductsPage = () => <div className="p-8"><h1>Home Page Products</h1></div>;
const OrdersPage = () => <div className="p-8"><h1>Orders</h1></div>;
const CreateAdminPage = () => <div className="p-8"><h1>Create Admin</h1></div>;
const AdminListPlaceholderPage = () => <div className="p-8"><h1>Admin List</h1></div>;
const ProfilePage = () => <div className="p-8"><h1>Profile</h1></div>;

const AdminPages = () => (
  <AdminLayout>
    <Routes>
      <Route path="" element={<DashboardPage />} />
      <Route path="config/brands" element={<BrandsPage />} />
      <Route path="config/categories" element={<CategoriesPage />} />
      <Route path="config/offer-categories" element={<OfferCategoriesPage />} />
      <Route path="config/home-page-sections" element={<HomePageSectionsPage />} />
      <Route path="config/banners" element={<BannersPage />} />
      <Route path="products" element={<ProductsListPage />} />
      <Route path="products/create" element={<CreateProductPage />} />
      <Route path="products/:id" element={<ProductDetailsPage />} />
      <Route path="products/:id/edit" element={<EditProductPage />} />
      <Route path="products/home-page" element={<HomePageProductsPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="users/create-admin" element={<CreateAdminPage />} />
      <Route path="users/admin-list" element={<AdminListPlaceholderPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Routes>
  </AdminLayout>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminPages />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;