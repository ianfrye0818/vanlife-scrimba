import { FileUploader } from 'react-drag-drop-files';
import { uploadImage } from '../firebase/firebaseStorage';

type DragAndDropProps = {
  userId: string;
  vanId: string;
  children: React.ReactNode;
  setProgress: (progress: number) => void;
};

export default function DragAndDrop({ userId, vanId, children, setProgress }: DragAndDropProps) {
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
