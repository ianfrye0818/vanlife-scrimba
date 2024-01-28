import NavLink from '../NavLink';
import { IoIosMenu } from 'react-icons/io';
import MobileNavBar from './MobileNavBar';
import { useState } from 'react';

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const navLinks = [
    { path: '/', text: 'Home' },
    { path: '/about', text: 'About' },
    { path: '/vans', text: 'Vans' },
  ];

  return (
    <header>
      <nav className='desktop-nav-bar'>
        <div className='logo'>#vanlife</div>
        <ul>
          {navLinks.map((link) => (
            <NavLink
              path={link.path}
              text={link.text}
            />
          ))}
        </ul>
      </nav>
      <IoIosMenu
        className='menu-icon'
        onClick={() => setIsActive((prev) => !prev)}
      />
      {isActive && (
        <MobileNavBar
          active={isActive}
          setActive={setIsActive}
        />
      )}
    </header>
  );
}
