import { useContext, useState } from 'react';
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
import { Progress } from '../../../../components/ui/progress';
import ImageContainer from '../../../../components/ImageContainer';

export default function EditAVan() {
  const [progress, setProgress] = useState(0);
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
    console.log('clicked');
    console.log(data);
  };

  const handleDelete = (image: string) => {
    console.log('delete', image);
    console.log('vanid', van?.id);
  };
  return (
    <Layout>
      <div className='mt-14 lg:mt-0 md:container p-2 text-3xl flex flex-col gap-3'>
        <h1>Edit Van: {van?.name}</h1>
        <p className='text-sm'>Drag and drop images below to add</p>
      </div>

      <main className='min-h-full md:container flex flex-col md:flex-row gap-2 p-2'>
        <div className='flex-1 min-h-full border border-gray-400 relative '>
          <span className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl text-gray-600 -z-[1]'>
            + Add Images
          </span>
          <DragAndDrop
            userId={user?.uid as string}
            vanId={van?.id as string}
            setProgress={setProgress}
          >
            {progress > 0 && (
              <Progress
                value={progress}
                className='w-[60%]'
              />
            )}
            <div className='grid grid-cols-3 grid-rows-1 gap-2 border h-full p-2 cursor-pointer justify-start'>
              {van?.imageUrls?.map((imageUrl) => (
                <ImageContainer
                  key={imageUrl}
                  imageUrl={imageUrl}
                  name={van.name}
                  handleDelete={() => handleDelete(van?.id)}
                />
              ))}
            </div>
          </DragAndDrop>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
          className='flex-1 flex flex-col gap-3 px-3'
        >
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            defaultValue={van?.name}
            {...register('name', { required: 'This field is required' })}
          />
          <Label htmlFor='description'>Description</Label>
          <Textarea
            cols={30}
            rows={8}
            className='resize-none overflow-scroll'
            id='description'
            defaultValue={van?.description}
            {...register('description', { required: 'This field is required' })}
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
          <button
            type='submit'
            className='p-3 bg-orange-500 hover:bg-orange-600 text-white uppercase'
          >
            Submit
          </button>
        </form>
      </main>
    </Layout>
  );
}
