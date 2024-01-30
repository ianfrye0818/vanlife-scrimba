import { useState } from 'react';
import { IoIosMenu, IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function MobileNavBar() {
  const [isActive, setIsActive] = useState(false);

  function toggleMobileNav() {
    setIsActive(!isActive);
  }
  return (
    <div>
      <nav className={`mobile-nav-bar ${isActive ? 'open' : ''}`}>
        <div className='logo'>
          <h1>VanLife</h1>
        </div>
        <ul className='nav-links'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/vans'>Vans</Link>
          </li>
        </ul>
        <IoMdClose
          className={`close-icon`}
          onClick={toggleMobileNav}
        />
      </nav>

      {!isActive && (
        <IoIosMenu
          className={`menu-icon ${isActive ? 'open' : ''}`}
          onClick={toggleMobileNav}
        />
      )}
    </div>
  );
}
