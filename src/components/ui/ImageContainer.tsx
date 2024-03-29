import { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

type ImageContainerProps = {
  imageUrl: string;
  name: string;
  handleDelete: () => void;
};

export default function ImageContainer({ imageUrl, name, handleDelete }: ImageContainerProps) {
  const [showTrashCan, setShowTrashCan] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowTrashCan(true)}
      onMouseLeave={() => setShowTrashCan(false)}
      onClick={(e) => e.stopPropagation()}
      className=' flex justify-center items-center relative'
    >
      <img
        src={imageUrl}
        alt={name}
        className='rounded-md object-cover block w-full h-full'
      />
      {showTrashCan && (
        <FaRegTrashAlt
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            cursor: 'pointer',
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '5px',
            boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.2)',
            color: 'red',
          }}
          onClick={handleDelete}
        />
      )}
    </div>
  );
}
