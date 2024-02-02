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
        className='text-white bg-orange-500 p-2 rounded-md font-bold ml-2 no-underline'
        path={'/sign-in'}
        text={'Sign In'}
      />
      <NavLink
        className='text-white bg-gray-600 p-2 rounded-md font-bold ml-2 no-underline'
        path={'/sign-up'}
        text={'Sign Up'}
      />
    </>
  );
  return (
    <nav className='hidden md:flex p-3 min-h-28 items-center'>
      <div>
        <Link
          className='font-black text-4xl uppercase'
          to={'/'}
        >
          #vanlife
        </Link>
      </div>
      <ul className='flex gap-6 mr-5 text-xl ml-auto list-none items-center'>
        {navLinks.map((link) => (
          <NavLink
            className='text-[#5a5858] text-xl'
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
