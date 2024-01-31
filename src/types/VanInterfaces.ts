import { VanFilterEnum } from './VanEnums';

export interface Van {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  type: string;
}

export interface VanFilterContextType {
  vanFilter: VanFilterEnum[];
  setVanFilter: React.Dispatch<React.SetStateAction<VanFilterEnum[]>>;
}
