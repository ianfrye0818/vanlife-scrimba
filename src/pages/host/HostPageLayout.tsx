//library imports
//component imports
import Layout from '../../Layout';
import HostVanContext from '../../context/HostVanContext';
import HostNavBar from './components/host-navbar/HostNavbar';

export default function Host({ children }: React.PropsWithChildren) {
  return (
    <Layout>
      <main className='md:container'>
        <HostVanContext>
          <HostNavBar />
          {children}
        </HostVanContext>
      </main>
    </Layout>
  );
}
