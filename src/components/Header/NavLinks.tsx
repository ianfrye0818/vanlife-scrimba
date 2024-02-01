/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from 'react-router-dom';
type NavLinkListProps = {
  text: string;
  path: string;
  [key: string]: any;
};

export default function NavLink({ path, text, ...rest }: NavLinkListProps) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Link
      {...rest}
      className={pathname === path ? 'active' : ''}
      to={path}
    >
      {text}
    </Link>
  );
}
