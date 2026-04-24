import { ROUTES } from './routes.js';

export const MENU_ITEMS = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: 'dashboard', // We'll use icons later
  },
  {
    label: 'Configurations',
    children: [
      { label: 'Brands', path: ROUTES.CONFIG_BRANDS },
      { label: 'Categories', path: ROUTES.CONFIG_CATEGORIES },
      { label: 'Offer Categories', path: ROUTES.CONFIG_OFFER_CATEGORIES },
      { label: 'Home Page Sections', path: ROUTES.CONFIG_HOME_PAGE_SECTIONS },
      { label: 'Banners', path: ROUTES.CONFIG_BANNERS },
    ],
  },
  {
    label: 'Products',
    children: [
      { label: 'All Products', path: ROUTES.PRODUCTS },
      { label: 'Create Product', path: ROUTES.PRODUCTS_CREATE },
      { label: 'Home Page Products', path: ROUTES.PRODUCTS_HOME_PAGE },
    ],
  },
  {
    label: 'Orders',
    path: ROUTES.ORDERS,
  },
  {
    label: 'Admin Users',
    children: [
      { label: 'Create Admin', path: ROUTES.USERS_CREATE_ADMIN },
      { label: 'Admin List', path: ROUTES.USERS_ADMIN_LIST },
    ],
  },
  {
    label: 'Profile',
    path: ROUTES.PROFILE,
  },
];