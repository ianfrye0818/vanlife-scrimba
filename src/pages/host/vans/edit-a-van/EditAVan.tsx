import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { HostContext } from '../../../../context/HostVanContext';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Textarea } from '../../../../components/ui/textarea';
import Layout from '../../../../Layout';
import { Van } from '../../../../types/VanInterfaces';
import { VanFilterEnum } from '../../../../types/VanEnums';
import DragAndDrop from '../../../../components/DragAndDropImage';
import { useUser } from '../../../../hooks/useUser';

export default function EditAVan() {
  const { vans } = useContext(HostContext);
  const params = useParams();
  // const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { user } = useUser();

  if (!vans) {
    return <p>Loading...</p>;
  }
  const van = vans.find((van) => van.id === params.id);

  const onSubmit = (data: Van) => {
    console.log(data);
  };
  return (
    <Layout>
      <div className='mt-14 lg:mt-0 md:container p-2 text-3xl mb-4'>
        <h1>Edit Van: {van?.name}</h1>
      </div>
      <main className='h-full md:container flex flex-col md:flex-row gap-2 p-2'>
        <DragAndDrop
          userId={user?.uid as string}
          vanId={van?.id as string}
        >
          <div className='img-container flex-1 grid grid-cols-3 gap-2 border border-gray-400 p-2'>
            {van?.imageUrls?.map((image) => (
              <img
                key={image}
                src={image}
                alt={van.name}
                className='rounded-md'
              />
            ))}
          </div>
        </DragAndDrop>
        <form
          onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
          className='flex-1 flex flex-col gap-3 px-3'
        >
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            defaultValue={van?.name}
            {...register('name')}
          />
          <Label htmlFor='description'>Description</Label>
          <Textarea
            cols={30}
            rows={8}
            className='resize-none overflow-scroll'
            id='description'
            defaultValue={van?.description}
            {...register('description')}
          />
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
          <Label htmlFor='type'>Type</Label>
          <select
            id='type'
            className='border border-gray-600 rounded-md p-2'
            defaultValue={van?.type as VanFilterEnum}
            {...register('type', { required: 'This field is required' })}
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
        </form>
      </main>
    </Layout>
  );
}
