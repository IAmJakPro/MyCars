import Dashboard from '../dashboard/pages/Dashboard';
import Users from '../users/pages/Users';
import CreateUser from '../users/pages/CreateUser';
import EditUser from '../users/pages/EditUser';
import {
  DashboardOutlined,
  HeatMapOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Cities from '../cities/pages/Cities';
import CreateCity from '../cities/pages/CreateCity';
import EditCity from '../cities/pages/EditCity';
import CreateCategory from '../categories/pages/CreateCategory';
import EditCategory from '../categories/pages/EditCategory';
import Categories from '../categories/pages/Categories';
import Admins from '../admins/pages/Admins';
import CreateAdmin from '../admins/pages/CreateAdmin';
import EditAdmin from '../admins/pages/EditAdmin';
import EditBrand from '../brands/pages/EditBrand';
import CreateBrand from '../brands/pages/CreateBrand';
import Brands from '../brands/pages/Brands';
import Extras from '../extras/pages/Extras';
import CreateExtra from '../extras/pages/CreateExtra';
import EditExtra from '../extras/pages/EditExtra';

const routes = [
  // Auth

  // Dashboard
  {
    key: 'dashboard',
    name: 'Dashboard',
    path: '/',
    component: <Dashboard />,
    icon: <DashboardOutlined />,
  },

  // Admins
  {
    key: 'admins',
    name: 'Admins',
    path: '/admins',
    component: <Admins />,
    icon: <UserOutlined />,
  },
  {
    key: 'create_admin',
    name: 'Create admin',
    path: '/admins/create',
    component: <CreateAdmin />,
  },
  {
    key: 'edit_admin',
    name: 'Edit admin',
    path: '/admins/edit/:id',
    component: <EditAdmin />,
  },

  // Users
  {
    key: 'users',
    name: 'Users',
    path: '/users',
    component: <Users />,
    icon: <UserOutlined />,
  },
  {
    key: 'create_user',
    name: 'Create user',
    path: '/users/create',
    component: <CreateUser />,
  },
  {
    key: 'edit_user',
    name: 'Edit user',
    path: '/users/edit/:id',
    component: <EditUser />,
  },

  // Cities
  {
    key: 'cities',
    name: 'Cities',
    path: '/cities',
    component: <Cities />,
    icon: <HeatMapOutlined />,
  },
  {
    key: 'create_city',
    name: 'Create city',
    path: '/cities/create',
    component: <CreateCity />,
  },
  {
    key: 'edit_city',
    name: 'Edit city',
    path: '/cities/edit/:id',
    component: <EditCity />,
  },

  // Categories
  {
    key: 'categories',
    name: 'Categories',
    path: '/categories',
    component: <Categories />,
    icon: <HeatMapOutlined />,
  },
  {
    key: 'create_category',
    name: 'Create category',
    path: '/categories/create',
    component: <CreateCategory />,
  },
  {
    key: 'edit_category',
    name: 'Edit category',
    path: '/categories/edit/:id',
    component: <EditCategory />,
  },

  // Brands
  {
    key: 'brands',
    name: 'Brands',
    path: '/brands',
    component: <Brands />,
    icon: <HeatMapOutlined />,
  },
  {
    key: 'create_brand',
    name: 'Create brand',
    path: '/brands/create',
    component: <CreateBrand />,
  },
  {
    key: 'edit_brand',
    name: 'Edit brand',
    path: '/brands/edit/:id',
    component: <EditBrand />,
  },

  // Extras
  {
    key: 'extras',
    name: 'Extras',
    path: '/extras',
    component: <Extras />,
    icon: <HeatMapOutlined />,
  },
  {
    key: 'create_extra',
    name: 'Create extra',
    path: '/extras/create',
    component: <CreateExtra />,
  },
  {
    key: 'edit_extra',
    name: 'Edit extra',
    path: '/extras/edit/:id',
    component: <EditExtra />,
  },
];

export default routes;
