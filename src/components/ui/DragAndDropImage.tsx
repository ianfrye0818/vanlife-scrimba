import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type DragAndDropImageProps = {
  handleFilesUpload: (files: File[]) => void;
  children: React.ReactNode;
};

export function DragAndDropImage({ handleFilesUpload, children }: DragAndDropImageProps) {
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
      {isDragActive ? <p>Drop the files here ...</p> : <div>{children}</div>}
    </div>
  );
}
