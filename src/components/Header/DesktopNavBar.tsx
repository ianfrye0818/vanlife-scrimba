import NavLink from './NavLinks';

const navLinks = [
  { path: '/', text: 'Home' },
  { path: '/about', text: 'About' },
  { path: '/vans', text: 'Vans' },
];

export default function DesktopNavBar() {
  return (
    <nav className='desktop-nav-bar'>
      <div className='logo'>#vanlife</div>
      <ul>
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
