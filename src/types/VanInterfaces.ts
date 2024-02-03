import { VanFilterEnum } from './VanEnums';

export interface Van {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  type: string;
}

//TODO - move this somewhere else - doens't make sense to be here.
export interface VanFilterContextType {
  vanFilter: VanFilterEnum[];
  setVanFilter: React.Dispatch<React.SetStateAction<VanFilterEnum[]>>;
}
