import { NavLink } from 'react-router-dom';

export default function HostNavBar() {
  const navlinks = [
    { path: '/host/dashboard', text: 'Dashboard' },
    { path: '/host/vans', text: 'Vans' },
    { path: '/host/income', text: 'Income' },
  ];

  return (
    <nav className='flex gap-4 mb-4'>
      {navlinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={({ isActive }) => (isActive ? 'underline' : '')}
        >
          {link.text}
        </NavLink>
      ))}
    </nav>
  );
}
