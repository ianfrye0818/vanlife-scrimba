import Layout from '../../layout';
import SignUpForm from './SignUpForm';

export default function SignUp() {
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
        <SignUpForm />
      </main>
    </Layout>
  );
}
