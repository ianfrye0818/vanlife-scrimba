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
        className='inline-block uppercase p-2 h-10 bg-orange-500 text-gray-100 ml-3 rounded-md font-bold'
        path={'/host/dashboard'}
        text={'Dashboard'}
      />
      <button
        className='p-2 uppercase bg-gray-900 text-gray-100 rounded-md ml-3 font-bold'
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
      <div>
        <Link
          className='font-black text-4xl uppercase'
          to={'/'}
        >
          #vanlife
        </Link>
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
