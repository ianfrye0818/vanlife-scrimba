import { Rating } from '@mui/material';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { updateItem } from '../firebase/firebaseDatabase';
import { Van } from '../types/VanInterfaces';
import { useQueryClient } from '@tanstack/react-query';

type reviewFormData = {
  name: string;
  review: string;
};
type reviewVanFormProps = {
  setOpen: (open: boolean) => void;
  van: Van;
};
export default function ReviewVanForm({ setOpen, van }: reviewVanFormProps) {
  const [value, setValue] = useState<number>(5);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const queryClient = useQueryClient();

  async function onSubmit(data: reviewFormData) {
    //create a new review object
    const newReview = { ...data, reviewStars: value };
    //add review object to reviews array in the van collection
    const response = await updateItem('vans', van.id, { reviews: [...van.reviews, newReview] });
    if (!response) {
      toast('Error Submitting Review', {
        description: 'There was an error submitting your review.',
      });
      return;
    }
    toast('Review Submitted Successfully', {
      description: 'Thank you for your review!',
    });
    reset();
    queryClient.invalidateQueries({ queryKey: ['van', van.id] });
    //close dialog box
    setOpen(false);
  }
  return (
    <form
      className='flex flex-col gap-4 w-full mx-auto my-7'
      onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
    >
      <div>
        <Label
          className='text-xl'
          htmlFor='name'
        >
          Name
        </Label>

        <Input
          type='text'
          {...register('name', { required: 'This field is required' })}
        />
        {errors.name && (
          <span className='text-sm text-red-500'>{errors.name.message?.toString()}</span>
        )}
      </div>
      <div>
        <p>How many stars would you give us?</p>
        <Rating
          value={value}
          name='reviewStars'
          onChange={(_, newValue) => {
            setValue(newValue as number);
          }}
          size='large'
        />
      </div>
      <div>
        <Label
          className='text-xl'
          htmlFor='review'
        >
          Review
        </Label>
        <Textarea
          className='resize-none '
          cols={30}
          rows={10}
          {...register('review', { required: 'This field is required' })}
        />
        {errors.review && (
          <span className='text-sm text-red-500'>{errors.review.message?.toString()}</span>
        )}
      </div>

      <button
        type='submit'
        className='bg-orange-600 hover:bg-orange-700 cursor-pointer text-white p-2'
      >
        Submit
      </button>
    </form>
  );
}
