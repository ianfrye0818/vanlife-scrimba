//library imports
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

//component imports
import { FaGoogle } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';

//custom imports
import { signInUser, signInWithGithub, signInWithGoogle } from '../../firebase/firebaseAuth';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type SignInFormProps = {
  setSignup: (signup: boolean) => void;
};

export default function SignInForm({ setSignup }: SignInFormProps) {
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
  }

  return (
    <div className='flex flex-col gap-4 w-96 mx-auto'>
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
        //uses react hook form to handle form submission
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        className='flex flex-col gap-4 w-full'
      >
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          placeholder='Enter your email'
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && <p className='text-red-600 text-sm'>{errors.email.message as string}</p>}
        <Label htmlFor='password'>Password</Label>
        <Input
          id='password'
          type='password'
          placeholder='Enter your password'
          {...register('password', { required: 'This field is required' })}
        />
        {errors.password && (
          <p className='text-red-600 text-sm'>{errors.password.message as string}</p>
        )}
        <Button
          className='bg-orange-600 hover:bg-orange-700 text-white'
          type='submit'
        >
          Sign In
        </Button>
        <p className='flex gap-2 items-center'>
          Don't have an account?
          <Button
            className='text-blue-600 underline p-0'
            variant={'link'}
            onClick={() => setSignup(true)}
          >
            Create One
          </Button>
        </p>
      </form>
    </div>
  );
}
