import { Link } from 'react-router-dom';
import NavLink from './NavLinks';

const navLinks = [
  { path: '/', text: 'Home' },
  { path: '/about', text: 'About' },
  { path: '/vans', text: 'Vans' },
];

export default function DesktopNavBar() {
  const user = true;

  const authLinks = user ? (
    <>
      <NavLink
        style={{
          marginLeft: '10px',
          color: 'white',
          backgroundColor: '#ff8c38',
          padding: '10px',
          borderRadius: '5px',
          textDecoration: 'none',
        }}
        path={'/dashboard'}
        text={'Dashboard'}
      />
      <button
        style={{
          color: 'white',
          backgroundColor: '#1f1f1f',
          padding: '11px',
          borderRadius: '5px',
          marginLeft: '10px',
          textDecoration: 'none',
          border: 'none',
          cursor: 'pointer',
          textTransform: 'uppercase',
        }}
        onClick={() => console.log('sign out')}
      >
        Sign Out
      </button>
    </>
  ) : (
    <>
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
      <NavLink
        style={{
          color: 'white',
          backgroundColor: '#6c757d',
          padding: '10px',
          borderRadius: '5px',
          marginLeft: '10px',
          textDecoration: 'none',
        }}
        path={'/sign-up'}
        text={'Sign Up'}
      />
    </>
  );
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
      <div className='auth-links'>{authLinks}</div>
    </nav>
  );
}
