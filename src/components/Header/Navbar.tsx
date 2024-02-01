import MobileNavBar from './mobile-nav-bar/MobileNavBar';
import DesktopNavBar from './DesktopNavBar';

export default function Navbar() {
  return (
    <header>
      <MobileNavBar />
      <DesktopNavBar />
    </header>
  );
}
