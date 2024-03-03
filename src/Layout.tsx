//library imports
import { PropsWithChildren } from 'react';

//component imports
import Navbar from './components/Header/ navbar/Navbar';
import Footer from './components/Footer/Footer';

//default layout for entire file - adds navbar and footer to all pages
export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='m-h-screen'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
