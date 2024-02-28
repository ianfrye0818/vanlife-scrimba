import { Rating } from '@mui/material';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

type reviewFormData = {
  name: string;
  review: string;
};

export default function ReviewVan() {
  const [value, setValue] = useState<number>(5);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function onSubmit(data: reviewFormData) {
    const newReview = { ...data, reviewStars: value };
    console.log(newReview);
    toast('Review Submitted Successfully', {
      description: 'Thank you for your review!',
    });
  }
  return (
    <div className='bg-white w-full'>
      <form
        className='flex flex-col gap-4 w-full mx-auto my-7'
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      >
        <Rating
          value={value}
          name='reviewStars'
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
          size='large'
        />
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
    </div>
  );
}
