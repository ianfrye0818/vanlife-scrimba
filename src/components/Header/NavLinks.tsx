/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation } from 'react-router-dom';

type NavLinkProps = {
  text: string;
  path: string;
  className?: string;
  [key: string]: any;
};

export default function NavLink({ path, text, className = '', ...rest }: NavLinkProps) {
  const location = useLocation();
  const { pathname } = location;

  return (
    <Link
      {...rest}
      className={`${
        pathname === path || pathname.startsWith(`${path}/`) ? 'underline' : ''
      } ${className}`}
      to={path}
    >
      {text}
    </Link>
  );
}
