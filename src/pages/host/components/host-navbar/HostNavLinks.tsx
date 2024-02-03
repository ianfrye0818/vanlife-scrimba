/* eslint-disable @typescript-eslint/no-explicit-any */
//TODO: remove this compoennt and use the NavLink component from the components folder

import { Link, useLocation } from 'react-router-dom';
type NavLinkListProps = {
  text: string;
  path: string;
  className?: string;
  [key: string]: any;
};

export default function HostNavLinks({ path, text, className = '', ...rest }: NavLinkListProps) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Link
      {...rest}
      className={`${pathname.startsWith(path) && 'underline'} ${className}`}
      to={path}
    >
      {text}
    </Link>
  );
}
