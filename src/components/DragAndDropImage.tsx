import { doc, updateDoc } from 'firebase/firestore';
import { uploadImage } from '../firebase/firebaseStorage';
import { ReactNode, useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';

type DragAndDropProps = {
  userId: string;
  vanId: string;
  children: ReactNode;
};

export default function DragAndDrop({ userId, vanId, children }: DragAndDropProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    const uploadFilesToDb = async () => {
      try {
        const metadata = await uploadImage(uploadedFiles, `vans/${userId}/${vanId}`);
        const docRef = doc(db, 'vans', vanId);
        if (metadata) {
          console.log(metadata);
          await updateDoc(docRef, { images: [...metadata] });
          console.log('updated');
          setUploadedFiles([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (uploadedFiles.length > 0) {
      uploadFilesToDb();
    }
  }, [uploadedFiles]);

  const handleChange = async (files: FileList) => {
    setUploadedFiles(Array.from(files));
  };

  return (
    <div
      className='relative h-full w-full border-dashed flex items-center justify-center'
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDraggingOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleChange(e.dataTransfer.files);
        setIsDraggingOver(false);
      }}
    >
      {isDraggingOver ? (
        <div className='absolute top-0 left-0 w-full h-full bg-gray-100 opacity-50 z-10' />
      ) : (
        <label
          htmlFor='file'
          className='w-full h-full flex items-center justify-center cursor-pointer'
        >
          <input
            type='file'
            id='file'
            name='file'
            multiple
            accept='image/*'
            className='hidden'
            onChange={(e) => handleChange(e.target.files as FileList)}
          />
          {children}
        </label>
      )}
    </div>
  );
}
