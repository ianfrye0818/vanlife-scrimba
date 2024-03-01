//library imports
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

//component imports
import { FaGithub, FaGoogle } from 'react-icons/fa6';
import { createUser, signInWithGithub, signInWithGoogle } from '../../firebase/firebaseAuth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type SignUpFormProps = {
  setSignup: (signup: boolean) => void;
};

export default function SignUpForm({ setSignup }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: { email: string; password: string; passwordConfirmation: string }) {
    if (data.password !== data.passwordConfirmation) {
      alert('Passwords do not match');
      return;
    }
    //sign in the user
    await createUser(data.email, data.password);
  }

  return (
    <div className='flex flex-col gap-4 w-96 mx-auto '>
      <Button
        type='button'
        className='flex gap-2 items-center justify-center'
        variant={'outline'}
        //create a function to sign in with google
        onClick={async () => {
          await signInWithGoogle();
        }}
      >
        <FaGoogle /> Sign In with Google
      </Button>
      <Button
        className='bg-black text-white flex gap-2 items-center justify-center hover:text-white hover:bg-gray-00'
        type='button'
        //create a function to sign in with github
        onClick={async () => {
          await signInWithGithub();
        }}
      >
        <FaGithub /> Sign In with Github
      </Button>
      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        className='flex flex-col gap-4 w-full'
      >
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          placeholder='Enter your email'
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && (
          <span className='text-red-600 text-sm'>{errors.email.message as string}</span>
        )}
        <Label htmlFor='password'>Password</Label>
        <Input
          placeholder='Enter your password'
          id='password'
          type='password'
          {...register('password', { required: 'This field is required' })}
        />
        {errors.password && (
          <span className='text-red-600 text-sm'>{errors.password.message as string}</span>
        )}

        <Input
          placeholder='Confirm your password'
          id='password-confirmation'
          type='password'
          {...register('passwordConfirmation', { required: 'This field is required' })}
        />
        {errors.passwordConfirmation && (
          <span className='text-red-600 text-sm'>
            {errors.passwordConfirmation.message as string}
          </span>
        )}

        <Button
          className='bg-orange-600 hover:bg-orange-700 text-white'
          type='submit'
        >
          Sign Up
        </Button>
        <p className='flex gap-2 items-center'>
          Already have an account?
          <Button
            className='text-blue-600 underline p-0'
            variant={'link'}
            onClick={() => setSignup(false)}
          >
            Sign In
          </Button>
        </p>
      </form>
    </div>
  );
}
