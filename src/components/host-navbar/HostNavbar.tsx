//library imports
import HostNavLinks from './HostNavLinks';

//component imports

export default function HostNavBar() {
  //sub component to display the host navbar
  const navLinks = [
    { path: '/host/dashboard', text: 'Dashboard' },
    { path: '/host/income', text: 'Income' },
    { path: '/host/vans', text: 'Vans' },
  ];

  return (
    //TODO: can probably refactor this to use the NavLink component instead of having a HostNavLinks component that does the same thing
    <nav style={{ padding: '20px' }}>
      <ul className='flex gap-3'>
        {navLinks.map((link) => (
          <HostNavLinks
            key={link.path}
            path={link.path}
            text={link.text}
          />
        ))}
      </ul>
    </nav>
  );
}
