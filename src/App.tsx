import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import VansPage from './pages/vans/VansPage';
import './server';
import VanDetailsPage from './pages/van-details/VanDetailsPage';
import NotFound from './pages/not-found/NotFoundPage';
import SignInPage from './pages/sign-in/SignInPage';
import SignUpPage from './pages/sign-up/SignUpPage';
import HostPage from './pages/host/HostPage';
import DashboardPage from './pages/host/dashboard/DashboardPage';
import IncomePage from './pages/host/income/IncomePage';
import ReviewsPage from './pages/host/reviews/ReviewsPage';
import HostVansPage from './pages/host/vans/HostVansPage';
import HostVanDetailsPage from './pages/host/vans/van-details/HostVanDetails';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  { path: '/about', element: <AboutPage /> },
  { path: '/vans', element: <VansPage /> },
  { path: '/vans/:id', element: <VanDetailsPage /> },
  { path: '/sign-in', element: <SignInPage /> },
  { path: '/sign-up', element: <SignUpPage /> },
  { path: '/host', element: <HostPage /> },
  { path: '/host/dashboard', element: <DashboardPage /> },
  { path: '/host/income', element: <IncomePage /> },
  { path: '/host/reviews', element: <ReviewsPage /> },
  { path: '/host/vans', element: <HostVansPage /> },
  { path: '/host/vans/:id', element: <HostVanDetailsPage /> },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
