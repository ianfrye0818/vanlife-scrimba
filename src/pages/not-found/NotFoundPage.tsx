import { Link } from 'react-router-dom';
export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={styles.heading}>404</h1>
        <p style={styles.text}>Oops! The page you're looking for could not be found.</p>
        <Link
          to='/'
          style={styles.link}
        >
          Go back to the home page
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: '5em',
    color: '#e74c3c',
    margin: 0,
  },
  text: {
    fontSize: '1.5em',
    color: '#333',
    marginBottom: '20px',
  },
  link: {
    fontSize: '1em',
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '10px 20px',
    border: '2px solid #3498db',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
    cursor: 'pointer',
    display: 'inline-block',

    ':hover': {
      backgroundColor: '#3498db',
      color: '#fff',
    },
  },
};
