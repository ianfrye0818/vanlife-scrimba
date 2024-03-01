import { useState } from 'react';
import { DialogBox } from './ui/DialogBox';
import SignInForm from './forms/SignInForm';
import SignUpForm from './forms/SignUpForm';

type signinModalProps = {
  triggerButtonClassName?: string;
};

export default function SignInModal({ triggerButtonClassName }: signinModalProps) {
  const [open, setOpen] = useState(false);
  const [signup, setSignup] = useState(false);
  return (
    <DialogBox
      open={open}
      setOpen={setOpen}
      dialogTriggerButton={<button className={triggerButtonClassName}>Sign In</button>}
    >
      {' '}
      {signup ? <SignUpForm setSignup={setSignup} /> : <SignInForm setSignup={setSignup} />}
    </DialogBox>
  );
}
