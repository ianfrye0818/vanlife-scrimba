//library imporrts
import { Link } from 'react-router-dom';

//component imports
import NavLink from './NavLinks';
import { logoutUser } from '../../../../firebase/firebaseAuth';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContextProvider';
// import CartIcon from './CartDrawer';
import SignInModal from '../../../SignInModal';

export default function DesktopNavBar() {
  const navLinks = [
    { path: '/', text: 'Home' },
    { path: '/about', text: 'About' },
    { path: '/vans', text: 'Vans' },
  ];
  const { user } = useContext(AuthContext);

  const authLinks = user ? (
    //TODO - refactor authlinks to seperate component to be consistent with mobile nav
    <div className='flex gap-4 items-center'>
      <NavLink
        className='text-[#5a5858] text-xl'
        path={'/host/dashboard'}
        text={'Host'}
      />
      <button
        className='p-2  bg-orange-500 text-gray-100 rounded-md'
        onClick={() => logoutUser()}
      >
        Sign Out
      </button>
    </div>
  ) : (
    <SignInModal />
  );
  return (
    <nav className='hidden lg:flex p-3 min-h-28 items-center'>
      <div>
        <Link
          className='font-black text-4xl uppercase'
          to={'/'}
        >
          #vanlife
        </Link>
        {user && <span>{user.email}</span>}
      </div>
      <ul className='flex gap-6 mr-5 ml-auto list-none items-center'>
        {navLinks.map((link) => (
          <NavLink
            className='text-[#5a5858] text-xl'
            key={link.path}
            path={link.path}
            text={link.text}
          />
        ))}
        <div className='auth-links'>{authLinks}</div>
        {/* <CartIcon /> */}
      </ul>
    </nav>
  );
}
