import NavLink from './NavLinks';

const navLinks = [
  { path: '/', text: 'Home' },
  { path: '/about', text: 'About' },
  { path: '/vans', text: 'Vans' },
];

type DesktopNavBarProps = {
  className: string;
};

export default function DesktopNavBar({ className }: DesktopNavBarProps) {
  return (
    <nav className={className}>
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
