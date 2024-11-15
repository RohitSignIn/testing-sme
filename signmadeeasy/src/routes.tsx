// src/routes.ts
import { RouteObject } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import UserProfile from './pages/UserProfile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import SignatureTemplate from './components/SignatureCanvas/SignatureTemplate';

// Define route objects here
export const routes: RouteObject[] = [
  {
    path: '/',
    // element: <HomePage />,
    element: <SignatureTemplate />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/user/:id',
    element: <UserProfile />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
