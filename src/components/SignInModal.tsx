import { useState } from 'react';
import { DialogBox } from './ui/DialogBox';
import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';

export default function SignInModal() {
  const [open, setOpen] = useState(false);
  const [signup, setSignup] = useState(false);
  return (
    <DialogBox
      open={open}
      setOpen={setOpen}
      dialogTriggerButton={
        <button className='p-2 bg-orange-500 hover:bg-orange-600  text-white cursor-pointer'>
          Sign In
        </button>
      }
    >
      {' '}
      {signup ? <SignUpForm setSignup={setSignup} /> : <SignInForm setSignup={setSignup} />}
    </DialogBox>
  );
}
