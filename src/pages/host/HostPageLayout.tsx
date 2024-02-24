//library imports
//component imports
import Layout from '../../Layout';
import HostNavBar from './components/host-navbar/HostNavbar';

export default function Host({ children }: React.PropsWithChildren) {
  return (
    <Layout>
      <main className='md:container h-screen md:h-full'>
        <HostNavBar />
        {children}
      </main>
    </Layout>
  );
}
