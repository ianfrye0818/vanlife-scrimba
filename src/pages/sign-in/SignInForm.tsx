//library imports
import { useState } from 'react';
import { Link } from 'react-router-dom';

//component imports
import { Button, TextField } from '@mui/material';
import { FaGoogle } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';

//custom imports
import { signInUser, signInWithGithub, signInWithGoogle } from '../../firebase/firebaseAuth';

//TODO: add form validation
//TODO: add form submission
//TODO: Refactor to use shadcn ui for more consistent styling
export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form className='flex flex-col gap-4 w-72 mx-auto'>
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
        onClick={() => signInWithGoogle()}
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
        onClick={() => signInWithGithub()}
      >
        <FaGithub /> Sign In with Github
      </Button>
      <TextField
        id='email'
        label='Email'
        variant='outlined'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id='password'
        label='Password'
        type='password'
        variant='outlined'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        sx={{ padding: '15px', backgroundColor: '#ff8c38', '&:hover': { background: '#ff8c38dd' } }}
        type='submit'
        variant='contained'
        onClick={() => {
          signInUser(email, password);
        }}
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
  );
}
