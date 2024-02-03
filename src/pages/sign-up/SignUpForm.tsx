//library imports
import { useState } from 'react';
import { Link } from 'react-router-dom';

//component imports
import { Button, TextField } from '@mui/material';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

//TODO: add form validation
//TODO: add form submission
//TODO: refactor to use tailwind
//TODO: Refactor to use shadcn ui for more consistent styling
export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '300px',
        margin: 'auto',
      }}
    >
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
        }}
      >
        <FaGithub /> Sign Up with Github
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
      <TextField
        id='password-confirmation'
        label='Confirm Password'
        type='password'
        variant='outlined'
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <Button
        sx={{ padding: '15px', backgroundColor: '#ff8c38', '&:hover': { background: '#ff8c38dd' } }}
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
  );
}
