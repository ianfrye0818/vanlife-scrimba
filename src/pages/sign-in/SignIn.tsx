import Layout from '../../layout';
import SignInForm from './SignInForm';

export default function SignIn() {
  return (
    <Layout>
      <main
        style={{
          height: 'calc(100vh - 100px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SignInForm />
      </main>
    </Layout>
  );
}
