//library imports
import { PropsWithChildren } from 'react';

//component imports
import Navbar from './components/Header/ navbar/Navbar';
import Footer from './components/Footer/Footer';

//default layout for entire file - adds navbar and footer to all pages
export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='h-screen mt-20 md:mt-0'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
