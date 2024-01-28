export default function MobileNavBar() {
  return (
    <nav className='mobile-nav-bar'>
      <div className='logo'>
        <h1>VanLife</h1>
      </div>
      <div className='hamburger'>
        <div className='line'></div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
      <ul className='nav-links'>
        <li>
          <a href='#'>About</a>
        </li>
        <li>
          <a href='#'>Vans</a>
        </li>
        <li>
          <a href='#'>FAQ</a>
        </li>
        <li>
          <a href='#'>Contact</a>
        </li>
      </ul>
    </nav>
  );
}
