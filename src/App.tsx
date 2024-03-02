//library imports
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

//component imports

//route imports
import Home from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import VansPage from './pages/vans/VansPage';
import VanDetailsPage from './pages/van-details/VanDetailsPage';
import NotFound from './pages/not-found/NotFoundPage';
import DashboardPage from './pages/host/dashboard/DashboardPage';
import IncomePage from './pages/host/income/IncomePage';
import HostVanDetailsPage from './pages/host/vans/van-details/HostVanDetails';
import CheckOutPage from './pages/cart/CheckOutPage';
import OrderConfirmationPage from './pages/order-confirmation/OrderConfirmationPage';
import { AuthContextProvider } from './context/AuthContextProvider';
import CartContextProvider from './context/CartContextProvider';
import ProtectedRoutes from './routes/ProtectedRoutes';
import HostVansPage from './pages/host/vans/HostVansPage';
import EditAVan from './pages/host/vans/edit-a-van/EditAVan';
import AddAVan from './pages/host/vans/add-a-van/AddAVan';
import SignInPage from './pages/sign-in/SignIn';
import DateContextProvider from './context/DateContextProvider';

//crate react query client to fetch data and handle async state
const queryClient = new QueryClient();

//set up routing paths within the application

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <NotFound /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/vans', element: <VansPage /> },
  { path: '/vans/:id', element: <VanDetailsPage /> },
  { path: '/cart', element: <CheckOutPage /> },
  { path: '/signin', element: <SignInPage /> },
  { path: '/order-confirmation/:orderId', element: <OrderConfirmationPage /> },
  {
    path: '/host',
    element: (
      <ProtectedRoutes>
        <Outlet />
      </ProtectedRoutes>
    ),
    children: [
      { path: 'income', element: <IncomePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'vans', element: <HostVansPage /> },
      { path: 'vans/:id', element: <HostVanDetailsPage /> },
      { path: 'vans/:id/edit', element: <EditAVan /> },
      { path: 'vans/add', element: <AddAVan /> },
    ],
  },
]);
export default function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <DateContextProvider>
            <RouterProvider router={router} />
            {/* add toast to any pages - can set custom message for toast within page */}
            <Toaster />
          </DateContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
