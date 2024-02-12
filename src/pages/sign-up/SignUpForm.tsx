//library imports
import { Link } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

//component imports
import { Button, TextField } from '@mui/material';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

//TODO: add form submission
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data: { email: string; password: string; confirmPassword: string }) {
    console.log(data.email, data.password, data.confirmPassword);
  }

  return (
    <div className='flex flex-col gap-4 w-96 mx-auto '>
      <Button
        variant='outlined'
        type='button'
        sx={{
          padding: '15px',
          color: '#1f1f1f',
          border: '1px solid #1f1f1f',
          display: 'flex',
          gap: '10px',
          width: '100%',
        }}
      >
        <FaGoogle /> Sign Up with Google
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
          width: '100%',
        }}
      >
        <FaGithub /> Sign Up with Github
      </Button>
      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        className='flex flex-col gap-4 w-full'
      >
        <TextField
          id='email'
          label='Email'
          variant='outlined'
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && (
          <span className='text-red-600 text-sm'>{errors.email.message as string}</span>
        )}

        <TextField
          id='password'
          label='Password'
          type='password'
          variant='outlined'
          {...register('password', { required: 'This field is required' })}
        />
        {errors.password && (
          <span className='text-red-600 text-sm'>{errors.password.message as string}</span>
        )}

        <TextField
          id='password-confirmation'
          label='Confirm Password'
          type='password'
          variant='outlined'
          {...register('passwordConfirmation', { required: 'This field is required' })}
        />
        {errors.passwordConfirmation && (
          <span className='text-red-600 text-sm'>
            {errors.passwordConfirmation.message as string}
          </span>
        )}

        <Button
          sx={{
            padding: '15px',
            backgroundColor: '#ff8c38',
            '&:hover': { background: '#ff8c38dd' },
          }}
          type='submit'
          variant='contained'
        >
          Sign Up
        </Button>
        <p>
          Already have an account?{' '}
          <Link
            style={{ color: 'blue', textDecoration: 'underline' }}
            to={'/sign-in'}
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
