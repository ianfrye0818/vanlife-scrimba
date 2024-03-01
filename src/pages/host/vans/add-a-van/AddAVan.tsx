//library imports
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//custom imports
import {
  deleteImage,
  getAllDownloadUrlsFromFolder,
  uploadImage,
} from '../../../../firebase/firebaseStorage';

//component imports
import { DragAndDropImage } from '../../../../components/ui/DragAndDropImage';
import Layout from '../../../../Layout';
import ImageContainer from '../../../../components/ui/ImageContainer';

//type imports

//custom hooks
import AddAVanForm from '../../../../components/forms/AddAVanForm';
import { Van } from '../../../../types/VanInterfaces';
import { addItem, getItembyID, updateItem } from '../../../../firebase/firebaseDatabase';
import { useUser } from '../../../../hooks/useUser';
import { Timestamp } from 'firebase/firestore';

export default function AddAVan() {
  //hooks
  //set the default image for the van when selected - use effect below loads the current default image into the state on load
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const [van, setVan] = useState<Van | null>(null);
  const queryClient = useQueryClient();
  const { user } = useUser();

  useEffect(() => {
    //on initial load create van in db with uid and get the van from the db
    const createVan = async () => {
      const newVanId = await addItem('vans', { uid: user?.uid, createdAt: Timestamp.now() });
      await updateItem('vans', newVanId as string, { imageBucketPath: `/images/vans/${newVanId}` });
      const newVan = (await getItembyID('vans', newVanId as string)) as Van;
      setVan(newVan);
    };
    if (user) createVan();
  }, [user]);
  //query to get all get image metadata from van folder
  const { data: imageData } = useQuery({
    queryKey: ['newHostedVan'],
    queryFn: async () => {
      const metadata = await getAllDownloadUrlsFromFolder(van?.imageBucketPath as string);
      return metadata;
    },
    enabled: van !== undefined && van !== null,
  });
  //create a mutation for deleting images from the storage bucket
  const deleteMutation = useMutation({
    mutationFn: async (fullImagePath: string) => await deleteImage(fullImagePath),
  });
  //create a mutation for adding images to the storage bucket
  const addImgMutation = useMutation({
    mutationFn: async (files: File[]) => await uploadImage(files, van?.imageBucketPath as string),
  });

  //handle delete image function - passed to Image Container component
  //invailidates the van query to update the images
  async function handleDelete(fullImagePath: string) {
    await deleteMutation.mutateAsync(fullImagePath);
    queryClient.invalidateQueries({ queryKey: ['newHostedVan'] });
  }
  //handle files upload function - passed to DragAndDropImage component
  //invailidates the van query to update the images
  async function handleFilesUpload(files: File[]) {
    await addImgMutation.mutateAsync(files);
    queryClient.invalidateQueries({ queryKey: ['newHostedVan'] });
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
        <AddAVanForm
          setDefaultImage={setDefaultImage}
          defaultImage={defaultImage}
          imageData={imageData}
          vanId={van?.id as string}
        />
      </main>
    </Layout>
  );
}
