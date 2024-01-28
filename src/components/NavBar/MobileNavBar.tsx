import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';

type MobileNavBarProps = {
  active: boolean;
  setActive: (active: boolean) => void;
};

export default function MobileNavBar({ active, setActive }: MobileNavBarProps) {
  return (
    <nav className='mobile-nav-bar'>
      <div className='logo'>
        <h1>VanLife</h1>
      </div>
      <div className='hamburger'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
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
      {active && (
        <IoMdClose
          onClick={() => setActive(false)}
          className='close-icon'
        />
      )}
    </nav>
  );
}
