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
import ImageContainer from '../../../../components/ImageContainer';
import { updateItem } from '../../../../firebase/firebaseDatabase';
import { deleteImage, uploadImage } from '../../../../firebase/firebaseStorage';
import { DragAndDropImage } from '../../../../components/DragAndDropImage';

export default function EditAVan() {
  const [progress, setProgress] = useState(0);
  const { vans, setVans } = useContext(HostContext);
  const params = useParams();
  // const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  if (!vans) {
    return <p>Loading...</p>;
  }
  const van = vans.find((van) => van.id === params.id);

  if (!van) {
    return <p>Van not found</p>;
  }
  const onSubmit = (data: Van) => {
    console.log(data);
    console.log('clicked');
  };

  //TODO fix this function
  const handleDelete = async (path: string, vanId: string, metaData: metaData) => {
    await deleteImage(path);
    const updatedVan = await updateItem('vans', vanId, { imageUrls: metaData });
    if (updatedVan) {
      const updatedVans = vans.map((van) => (van.id === vanId ? updatedVan : van) as Van);
      setVans(updatedVans);
    }
  };

  const handleFilesUpload = async (acceptedFiles: File[]) => {
    const data = await uploadImage(acceptedFiles, 'vans/' + van.id, setProgress);
    if (data) {
      const newobj = data.map((item) => {
        return {
          url: item.url,
          metadata: {
            name: item.metaData.name,
            bucket: item.metaData.bucket,
            contentType: item.metaData.contentType,
            fullPath: item.metaData.fullPath,
            size: item.metaData.size,
            timeCreated: item.metaData.timeCreated,
            updated: item.metaData.updated,
          },
        };
      });
      const updatedVanImages = [...van.images, ...newobj];
      const updatedVan = { ...van, images: updatedVanImages };
      const updatedItem = await updateItem('vans', van.id, { images: updatedVanImages });
      setVans(vans.map((van) => (van.id === van.id ? updatedVan : van)) as Van[]);
      console.log('db item: ', updatedItem);
      console.log('context item', vans);
    }
  };

  return (
    <Layout>
      <div className='mt-14 lg:mt-0 md:container p-2 text-3xl flex flex-col gap-3'>
        <h1>Edit Van: {van?.name}</h1>
      </div>

      <main className='h-full md:container flex flex-col md:flex-row gap-2 p-2'>
        <div className='flex-1 h-full '>
          <DragAndDropImage handleFilesUpload={handleFilesUpload} />
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
