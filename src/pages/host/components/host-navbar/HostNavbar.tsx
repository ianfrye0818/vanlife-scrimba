import HostNavLinks from './HostNavLinks';
const navLinks = [
  { path: '/host/dashboard', text: 'Dashboard' },
  { path: '/host/income', text: 'Income' },
  { path: '/host/vans', text: 'Vans' },
  { path: '/host/reviews', text: 'Reviews' },
];

export default function HostNavBar() {
  return (
    <nav style={{ padding: '20px' }}>
      <ul>
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
