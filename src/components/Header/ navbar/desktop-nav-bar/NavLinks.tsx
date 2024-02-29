//library imports
import { Link, useLocation } from 'react-router-dom';

//component imports

type NavLinkProps = {
  text: string;
  path: string;
  className?: string;
  [key: string]: object | string | undefined;
};

export default function NavLink({ path, text, className = '', ...rest }: NavLinkProps) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Link
      {...rest}
      className={`${
        pathname === path ||
        pathname.startsWith(`${path}/`) ||
        pathname.split('/')[1] === path.split('/')[1]
          ? 'underline'
          : ''
      } ${className}`}
      to={path}
    >
      {text}
    </Link>
  );
}
