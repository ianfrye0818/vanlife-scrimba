import { FileUploader } from 'react-drag-drop-files';
import { uploadImage } from '../firebase/firebaseStorage';
import { useEffect, useState } from 'react';

type DragAndDropProps = {
  userId: string;
  vanId: string;
  children: React.ReactNode;
  setProgress: (progress: number) => void;
};

export default function DragAndDrop({ userId, vanId, setProgress }: DragAndDropProps) {
  const [files, setFiles] = useState<File[]>([]);
  const handleChange = async () => {
    //upload files to db
    const metadata = await uploadImage([...files], `${userId}/${vanId}`, setProgress);
    console.log(metadata);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleChange(e.dataTransfer.files);
      }}
    >
      <label htmlFor='file'>
        <input
          type='file'
          id='file'
          name='file'
          multiple
          accept='image/*'
          className='hidden'
          onChange={(e) => handleChange(e.target.files)}
        />
      </label>
    </div>
  );
}
