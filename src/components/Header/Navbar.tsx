//library imports

//component imports
import MobileNavBar from './mobile-nav-bar/MobileNavBar';
import DesktopNavBar from './DesktopNavBar';

export default function Navbar() {
  return (
    <header className='container'>
      <MobileNavBar />
      <DesktopNavBar />
    </header>
  );
}
