import NavLink from './NavLink';

export default function Navbar() {
  const navLinks = [
    { path: '/', text: 'Home' },
    { path: '/about', text: 'About' },
    { path: '/vans', text: 'Vans' },
  ];

  return (
    <nav>
      <div className='logo'>#vanlife</div>
      <ul>
        {navLinks.map((link) => (
          <NavLink
            path={link.path}
            text={link.text}
          />
        ))}
      </ul>
    </nav>
  );
}
