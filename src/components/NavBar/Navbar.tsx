import MobileNavBar from './MobileNavBar';
import DesktopNavBar from './DesktopNavBar';

export default function Navbar() {
  return (
    <header>
      <MobileNavBar />
      <DesktopNavBar className='desktop-nav-bar' />
    </header>
  );
}
