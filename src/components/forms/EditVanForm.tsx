//library imports
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';

//component imports
import SelectImage from '../ui/SelectImage';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

//custom imports
import { updateItem } from '../../firebase/firebaseDatabase';

//type imports
import { metaData } from '../../firebase/firebaseStorage';
import { VanFilterEnum } from '../../types/VanEnums';
import { Van } from '../../types/VanInterfaces';
type EditVanFormProps = {
  van: Van;
  setDefaultImage: (value: string) => void;
  defaultImage: string;
  imageData: metaData[] | undefined | null;
};

export default function EditVanForm({
  van,
  setDefaultImage,
  defaultImage,
  imageData,
}: EditVanFormProps) {
  const [defaultImageError, setDefaultImageError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //create a mutation for updating the van in the database

  const updateVanMutation = useMutation({
    mutationFn: async (updatedVan: Van) => {
      await updateItem('vans', van?.id as string, updatedVan);
    },
  });

  //on submit function for the form - updates the van in the database
  //invailidates the van query to update the images
  //navigates to the vans page
  async function onSubmit(submitData: Van) {
    if (!defaultImage) {
      setDefaultImageError('Please select a default image');
      return;
    }
    const updatedVan = {
      ...van,
      ...submitData,
      imageURL: defaultImage,
      updatedAt: Timestamp.now(),
    };
    await updateVanMutation.mutateAsync(updatedVan);
    queryClient.invalidateQueries({ queryKey: ['hostedVans'] });
    navigate('/host/vans');
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      className='flex-1 flex flex-col gap-3 px-3 pb-5'
    >
      <Label htmlFor='name'>Name</Label>
      <Input
        id='name'
        defaultValue={van?.name}
        {...register('name', { required: 'This field is required' })}
      />
      {errors.name && <p className='text-red-500 text-md'>{errors.name.message?.toString()}</p>}
      <Label htmlFor='description'>Description</Label>
      <Textarea
        cols={30}
        rows={8}
        className='resize-none overflow-scroll'
        id='description'
        defaultValue={van?.description}
        {...register('description', { required: 'This field is required' })}
      />
      {errors.description && (
        <p className='text-red-500 text-md'>{errors.description.message?.toString()}</p>
      )}
      <Label htmlFor='price'>Price</Label>
      <Input
        id='price'
        defaultValue={van?.price}
        {...register('price', {
          required: 'This field is required',
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: 'Please enter a valid price',
          },
        })}
      />
      {errors.price && <p className='text-red-500 text-md'>{errors.price.message?.toString()}</p>}
      <Label htmlFor='type'>Type</Label>
      <select
        id='type'
        className='border border-gray-600 rounded-md p-2'
        defaultValue={van?.type as VanFilterEnum}
        {...register('type')}
      >
        <option value={VanFilterEnum.rugged}>{VanFilterEnum.rugged}</option>
        <option value={VanFilterEnum.luxury}>{VanFilterEnum.luxury}</option>
        <option value={VanFilterEnum.simple}>{VanFilterEnum.simple}</option>
      </select>
      <div className='flex gap-3'>
        <label htmlFor='available'>Available?</label>
        <input
          id='available'
          type='checkbox'
          defaultChecked={van?.available}
          {...register('available')}
        />
      </div>
      <SelectImage
        setDefaultImage={setDefaultImage}
        van={van as Van}
        imageData={imageData as metaData[]}
      />
      {defaultImageError && <p className='text-red-500 text-md'>{defaultImageError}</p>}
      <button
        type='submit'
        className='p-3 bg-orange-500 hover:bg-orange-600 text-white uppercase'
      >
        Submit
      </button>
    </form>
  );
}
