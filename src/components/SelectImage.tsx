import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '../components/ui/select';
import { metaData } from '../firebase/firebaseStorage';
import { Van } from '../types/VanInterfaces';

type SelectImageProps = {
  setDefaultImage: (value: string) => void;
  van: Van;
  imageData: metaData[];
};

export default function SelectImage({ setDefaultImage, van, imageData }: SelectImageProps) {
  return (
    <div className='w-full'>
      <label htmlFor='default-image'>Default Image</label>
      {imageData && imageData?.length > 0 && (
        <Select
          defaultValue={van?.imageURL}
          onValueChange={(value) => setDefaultImage(value as string)}
        >
          <SelectTrigger className='w-[180px] h-[100px]'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className='bg-white '>
              <SelectLabel>Van Image</SelectLabel>
              {imageData.map((image, index) => (
                <SelectItem
                  key={index}
                  value={image.url}
                >
                  <img
                    src={image.url}
                    className='w-[75px] h-[75px] object-contain'
                  />
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
