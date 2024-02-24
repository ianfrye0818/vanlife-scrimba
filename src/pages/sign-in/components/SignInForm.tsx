//library imports
import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

//component imports
import { Button, TextField } from '@mui/material';
import { FaGoogle } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';

//custom imports
import { signInUser, signInWithGithub, signInWithGoogle } from '../../../firebase/firebaseAuth';

export default function SignInForm() {
  const navigate = useNavigate();

  //react hook form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: { email: string; password: string }) {
    //sign in the user
    const user = await signInUser(data.email, data.password);
    if (!user) return;
    //after successful sign in redirect to previous page
    navigate(-1);
  }

  return (
    <div className='flex flex-col gap-4 w-96 mx-auto'>
      <Button
        variant='outlined'
        type='button'
        sx={{
          padding: '15px',
          color: '#1f1f1f',
          border: '1px solid #1f1f1f',
          display: 'flex',
          gap: '10px',
        }}
        //create a function to sign in with google
        onClick={async () => {
          await signInWithGoogle();
          navigate('/host/dashboard');
        }}
      >
        <FaGoogle /> Sign In with Google
      </Button>
      <Button
        variant='contained'
        type='button'
        sx={{
          padding: '15px',
          backgroundColor: '#1f1f1f',
          '&:hover': { background: '#1f1f1fdd' },
          color: '#f5f5f5',
          display: 'flex',
          gap: '10px',
        }}
        //create a function to sign in with github
        onClick={async () => {
          await signInWithGithub();
          navigate('/host/dashboard');
        }}
      >
        <FaGithub /> Sign In with Github
      </Button>
      <form
        //uses react hook form to handle form submission
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        className='flex flex-col gap-4 w-full'
      >
        <TextField
          id='email'
          label='Email'
          variant='outlined'
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && <p className='text-red-600 text-sm'>{errors.email.message as string}</p>}
        <TextField
          id='password'
          label='Password'
          type='password'
          variant='outlined'
          {...register('password', { required: 'This field is required' })}
        />
        {errors.password && (
          <p className='text-red-600 text-sm'>{errors.password.message as string}</p>
        )}
        <Button
          type='submit'
          sx={{
            padding: '15px',
            backgroundColor: '#ff8c38',
            '&:hover': { background: '#ff8c38dd' },
          }}
          variant='contained'
        >
          Sign In
        </Button>
        <p>
          Don't have an account?{' '}
          <Link
            style={{ color: 'blue', textDecoration: 'underline' }}
            to={'/sign-up'}
          >
            Create One
          </Link>
        </p>
      </form>
    </div>
  );
}
