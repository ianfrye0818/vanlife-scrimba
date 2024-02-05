//library imports

//component imports
import Layout from '../../layout';
import HostNavBar from './components/host-navbar/HostNavbar';

export default function Host({ children }: React.PropsWithChildren) {
  return (
    <Layout>
      <main className='container'>
        <HostNavBar />
        {children}
      </main>
    </Layout>
  );
}
