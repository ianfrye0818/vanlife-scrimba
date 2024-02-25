import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { uploadImage } from '../firebase/firebaseStorage';

type DragAndDropProps = {
  userId: string;
  vanId: string;
  children: React.ReactNode;
};

export default function DragAndDrop({ userId, vanId, children }: DragAndDropProps) {
  const [progress, setProgress] = useState(0);

  const handleChange = async (files: File[]) => {
    //upload files to db
    const metadata = await uploadImage([...files], `${userId}/${vanId}`, setProgress);
    console.log(metadata);
  };

  return (
    <FileUploader
      handleChange={handleChange}
      name='file'
      // types={['.png', '.jpg', '.jpeg']}
      types={['.PNG', '.JPG', '.JPEG', 'jpeg', 'jpg', 'png']}
      multiple={true}
      label='Drag and Drop Images Here'
      children={children}
    />
  );
}
