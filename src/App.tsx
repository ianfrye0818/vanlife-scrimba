import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Vans from './pages/vans/Vans';
import './server';
import VanDetails from './pages/van-details/VanDetails';
import NotFound from './pages/not-found/NotFound';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  { path: '/about', element: <About /> },
  { path: '/vans', element: <Vans /> },
  { path: '/vans/:id', element: <VanDetails /> },
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up', element: <SignUp /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
