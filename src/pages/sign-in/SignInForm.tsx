import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        sx={{ padding: '15px' }}
        type='submit'
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
  );
}
