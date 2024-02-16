import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='hidden lg:flex container justify-center items-center min-h-28 bg-[#1f1f1f] text-white'>
      Ⓒ 2022 <Link to={'/'}>#VANLIFE</Link>
    </footer>
  );
}
