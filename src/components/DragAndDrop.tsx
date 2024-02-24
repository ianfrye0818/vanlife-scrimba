import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';

export default function DragAndDrop() {
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (files: File[]) => {
    setFiles(files);
    //upload files to db
  };

  return (
    <FileUploader
      handleChange={handleChange}
      name='file'
      types={['.png', '.jpg', '.jpeg']}
    />
  );
}
