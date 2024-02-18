//library imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

//component imports

//route imports
import Home from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import VansPage from './pages/vans/VansPage';
import VanDetailsPage from './pages/van-details/VanDetailsPage';
import NotFound from './pages/not-found/NotFoundPage';
import SignInPage from './pages/sign-in/SignInPage';
import SignUpPage from './pages/sign-up/SignUpPage';
import DashboardPage from './pages/host/dashboard/DashboardPage';
import IncomePage from './pages/host/income/IncomePage';
import ReviewsPage from './pages/host/reviews/ReviewsPage';
import HostVanDetailsPage from './pages/host/vans/van-details/HostVanDetails';
import CheckOutPage from './pages/checkout/CheckOutPage';
import OrderConfirmationPage from './pages/order-confirmation/OrderConfirmationPage';
import { AuthContextProvider } from './context/AuthContextProvider';
import CartContextProvider from './context/cartContext';

//crate react query client to fetch data and handle async state
const queryClient = new QueryClient();

//set up routing paths within the application
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
  { path: '/host/income', element: <IncomePage /> },
  { path: '/host/reviews', element: <ReviewsPage /> },
  { path: '/host/dashboard', element: <DashboardPage /> },
  { path: '/host/vans', element: <HostVanDetailsPage /> },
  { path: '/host/vans/:id', element: <HostVanDetailsPage /> },
  { path: '/cart', element: <CheckOutPage /> },
  { path: '/order-confirmation/:orderId', element: <OrderConfirmationPage /> },
]);

export default function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <RouterProvider router={router} />
          {/* add toast to any pages - can set custom message for toast within page */}
          <Toaster />
        </CartContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
