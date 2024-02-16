//library imports
//component imports
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import HostNavBar from './components/host-navbar/HostNavbar';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';

export default function Host({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (!user && pathname.startsWith('/host')) {
      navigate('/sign-in');
    }
  }, [user, pathname, navigate]);

  return (
    <Layout>
      <main className='container'>
        <HostNavBar />
        {children}
      </main>
    </Layout>
  );
}
