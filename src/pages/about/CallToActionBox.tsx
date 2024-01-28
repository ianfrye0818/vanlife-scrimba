import { Link } from 'react-router-dom';

export default function CallToActionBox() {
  return (
    <div className='about__call-to-action-box'>
      <div>
        <p className='about__call-to-action-p'>Your Destination is waiting.</p>
        <p className='about__call-to-action-p'>Your van is ready.</p>
      </div>
      <Link
        to={'/vans'}
        className='btn btn-secondary'
      >
        Explore our vans
      </Link>
    </div>
  );
}
