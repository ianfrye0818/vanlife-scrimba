//library imports
import NavLink from '../Header/ navbar/desktop-nav-bar/NavLinks';

//component imports

export default function HostNavBar() {
  //sub component to display the host navbar
  const navLinks = [
    { path: '/host/dashboard', text: 'Dashboard' },
    { path: '/host/income', text: 'Income' },
    { path: '/host/vans', text: 'Vans' },
  ];

  return (
    <nav style={{ padding: '20px' }}>
      <ul className='flex gap-3'>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            path={link.path}
            text={link.text}
          />
        ))}
      </ul>
    </nav>
  );
}
