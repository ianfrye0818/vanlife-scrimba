import { useContext } from 'react';
import Layout from '../../../../Layout';
import { HostContext } from '../../../../context/HostVanContext';
import { useParams } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteImage,
  getAllDownloadUrlsFromUserFolder,
  uploadImage,
} from '../../../../firebase/firebaseStorage';
import { Label } from '../../../../components/ui/label';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import { VanFilterEnum } from '../../../../types/VanEnums';
import { DragAndDropImage } from '../../../../components/DragAndDropImage';
import ImageContainer from '../../../../components/ImageContainer';
import { FullMetadata } from 'firebase/storage';
import { Van } from '../../../../types/VanInterfaces';

export default function EditAVan() {
  const { vans } = useContext(HostContext);
  const params = useParams();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const van = vans.find((van) => van.id === params.id);

  //query to get all get image metadata from van folder
  //TODO: rename this function
  const { data: imageData } = useQuery({
    queryKey: ['van'],
    queryFn: async () => {
      return (await getAllDownloadUrlsFromUserFolder(`${van?.imageBucketPath}`)) as {
        url: string;
        metadata: FullMetadata;
      }[];
    },
    enabled: van !== undefined,
  });

  const deleteMutation = useMutation({
    mutationFn: async (fullImagePath: string) => await deleteImage(fullImagePath),
  });

  const addImgMutation = useMutation({
    mutationFn: async (files: File[]) => await uploadImage(files, van?.imageBucketPath as string),
  });

  async function handleDelete(fullImagePath: string) {
    await deleteMutation.mutateAsync(fullImagePath);
    queryClient.invalidateQueries({ queryKey: ['van'] });
  }

  async function handleFilesUpload(files: File[]) {
    await addImgMutation.mutateAsync(files);
    queryClient.invalidateQueries({ queryKey: ['van'] });
  }
  function onSubmit(submitData: Van) {
    console.log(submitData);
  }
  return (
    <Layout>
      <div className='mt-14 lg:mt-0 md:container p-2 text-3xl flex flex-col gap-3'>
        <h1>Edit Van: {van?.name}</h1>
      </div>

      <main className='h-full md:container flex flex-col md:flex-row gap-2 p-2'>
        <div className='flex-1 h-full '>
          <DragAndDropImage handleFilesUpload={handleFilesUpload}>
            <div className='grid grid-cols-3 w-full gap-3'>
              {imageData?.map((image, index) => (
                <ImageContainer
                  key={index}
                  imageUrl={image.url}
                  name={image.metadata.name}
                  handleDelete={() => handleDelete(image.metadata.fullPath)}
                />
              ))}
            </div>
          </DragAndDropImage>
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
