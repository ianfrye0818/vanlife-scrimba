import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type DragAndDropImageProps = {
  handleFilesUpload: (files: File[]) => void;
};

export function DragAndDropImage({ handleFilesUpload }: DragAndDropImageProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleFilesUpload(acceptedFiles);
    },
    [handleFilesUpload]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        className: 'border-2 border-dashed border-gray-300 p-4 rounded-lg h-full',
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className='grid grid-cols-3 justify-center items-center'>
          <div className='relative'>
            <img
              src='https://images.pexels.com/photos/19682307/pexels-photo-19682307/free-photo-of-pink-flowers-on-a-shrub.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
              alt=''
              className='w-full h-full object-cover rounded-lg'
            />
            <button className='absolute top-3 right-3 text-red bg-white opacity-45'>Remove</button>
          </div>
        </div>
      )}
    </div>
  );
}
