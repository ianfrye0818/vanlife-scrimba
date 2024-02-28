//TODO: Refactor this page into smaller components
//library imports
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//custom imports
import {
  deleteAllImages,
  deleteImage,
  getAllDownloadUrlsFromFolder,
  uploadImage,
} from '../../../../firebase/firebaseStorage';
import { deleteItem, queryItem } from '../../../../firebase/firebaseDatabase';

//component imports
import { DragAndDropImage } from '../../../../components/ui/DragAndDropImage';
import Layout from '../../../../Layout';
import ImageContainer from '../../../../components/ui/ImageContainer';
import RemoveItemDialog from '../../../../components/ui/RemoveItemAlertDialog';

//type imports
import { Van } from '../../../../types/VanInterfaces';

//custom hooks
import { useUser } from '../../../../hooks/useUser';
import EditVanForm from '../../../../components/forms/EditVanForm';

export default function EditAVan() {
  //hooks
  //set the default image for the van when selected - use effect below loads the current default image into the state on load
  const [defaultImage, setDefaultImage] = useState<string>('');
  const { user } = useUser();
  const params = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // query db for current user's vans and set the van to be edited in the 'van' variable
  const { data: vans } = useQuery({
    queryKey: ['hostedVans'],
    queryFn: async () => {
      return (await queryItem('vans', 'uid', user?.uid as string)) as Van[];
    },
    enabled: user !== undefined && user !== null,
  });
  //create a van for the current van
  const van = vans?.find((van) => van.id === params.id);
  //once van is loaded load the default image into the default image state declared above
  useEffect(() => {
    setDefaultImage(van?.imageURL as string);
  }, [van]);

  //query to get all get image metadata from van folder
  const { data: imageData } = useQuery({
    queryKey: ['van'],
    queryFn: async () => {
      const metadata = await getAllDownloadUrlsFromFolder(van?.imageBucketPath as string);
      return metadata;
    },
    enabled: van !== undefined,
  });
  //create a mutation for deleting images from the storage bucket
  const deleteMutation = useMutation({
    mutationFn: async (fullImagePath: string) => await deleteImage(fullImagePath),
  });
  //create a mutation for adding images to the storage bucket
  const addImgMutation = useMutation({
    mutationFn: async (files: File[]) => await uploadImage(files, van?.imageBucketPath as string),
  });

  const deleteVanMutation = useMutation({
    mutationFn: async (vanId: string) => {
      await deleteItem('vans', vanId);
      await deleteAllImages(`/images/vans/${van?.id}`);
    },
  });

  //handle delete image function - passed to Image Container component
  //invailidates the van query to update the images
  async function handleDelete(fullImagePath: string) {
    await deleteMutation.mutateAsync(fullImagePath);
    queryClient.invalidateQueries({ queryKey: ['van'] });
  }
  //handle files upload function - passed to DragAndDropImage component
  //invailidates the van query to update the images
  async function handleFilesUpload(files: File[]) {
    await addImgMutation.mutateAsync(files);
    queryClient.invalidateQueries({ queryKey: ['van'] });
  }

  async function deleteVan() {
    await deleteVanMutation.mutateAsync(van?.id as string);
    queryClient.invalidateQueries({ queryKey: ['hostedVans', 'vans'] });
    navigate('/host/vans');
  }

  return (
    <Layout>
      <div className='mt-14 lg:mt-0 md:container p-2 flex justify-between gap-3'>
        <h1 className='text-3xl'>Edit Van: {van?.name}</h1>
        <RemoveItemDialog
          actionCallback={deleteVan}
          triggerClassNames='text-md p-2 rounded-md bg-red-600 hover:bg-red-700 text-white cursor-pointer'
          triggerText='Delete Van'
        />
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
        <EditVanForm
          van={van as Van}
          setDefaultImage={setDefaultImage}
          imageData={imageData}
          defaultImage={defaultImage}
        />
      </main>
    </Layout>
  );
}
