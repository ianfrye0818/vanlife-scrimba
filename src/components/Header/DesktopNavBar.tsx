import { Link } from 'react-router-dom';
import NavLink from './NavLinks';

const navLinks = [
  { path: '/', text: 'Home' },
  { path: '/about', text: 'About' },
  { path: '/vans', text: 'Vans' },
];

export default function DesktopNavBar() {
  return (
    <nav className='desktop-nav-bar'>
      <div className='logo'>
        <Link to={'/'}>#vanlife</Link>
      </div>
      <ul>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            path={link.path}
            text={link.text}
          />
        ))}
      </ul>
      <div className='auth-links'>
        <NavLink
          style={{
            color: 'white',
            backgroundColor: '#ff8c38',
            padding: '10px',
            borderRadius: '5px',
            marginLeft: '10px',
            textDecoration: 'none',
          }}
          path={'/sign-in'}
          text={'Sign In'}
        />
      </div>
    </nav>
  );
}
