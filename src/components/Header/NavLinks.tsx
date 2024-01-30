import { Link, useLocation } from 'react-router-dom';
type NavLinkListProps = {
  text: string;
  path: string;
};

export default function NavLink({ path, text }: NavLinkListProps) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Link
      className={pathname === path ? 'active' : ''}
      to={path}
    >
      {text}
    </Link>
  );
}
