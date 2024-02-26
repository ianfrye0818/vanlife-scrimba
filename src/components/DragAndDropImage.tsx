import { metaData, uploadImage } from '../firebase/firebaseStorage';
import { ReactNode, useEffect, useState } from 'react';

type DragAndDropProps = {
  children?: ReactNode;
  setProgress: (progress: number) => void;
  onFilesUpload: (metaData: metaData[]) => void;
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  path: string;
};

export default function DragAndDrop({
  onFilesUpload,
  setProgress,
  path,
  uploadedFiles,
  setUploadedFiles,
  children,
}: DragAndDropProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    async function uploadFilesToDb(files: File[]) {
      const metaData = await uploadImage(files, path, setProgress);
      if (metaData) {
        onFilesUpload(metaData);
      }
    }
    if (uploadedFiles.length > 0) {
      uploadFilesToDb(uploadedFiles);
    }
  }, [path, setProgress, uploadedFiles]);

  function handleChange(files: FileList) {
    const filesArray = Array.from(files);
    setUploadedFiles(filesArray);
  }

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
      {isDraggingOver && (
        <div className='absolute top-0 left-0 w-full h-full bg-gray-100 opacity-50 z-10' />
      )}
      <label
        htmlFor='file'
        className='w-full h-full cursor-pointer border-dashed border-2 border-gray-400 flex justify-start items-start gap-2 p-2 flex-wrap'
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
    </div>
  );
}
