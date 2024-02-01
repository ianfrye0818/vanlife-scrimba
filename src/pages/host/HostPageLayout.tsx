import Layout from '../../layout';
import HostNavBar from './components/host-navbar/HostNavbar';

export default function Host({ children }: React.PropsWithChildren) {
  return (
    <Layout>
      <main>
        <HostNavBar />
        {children}
      </main>
    </Layout>
  );
}