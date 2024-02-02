import { PropsWithChildren } from 'react';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='md:w-10/12 mx-auto h-screen'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
