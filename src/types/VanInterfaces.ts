import { metaData } from '../firebase/firebaseStorage';

export type Van = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageURL?: string;
  imageUrls: metaData[]; //replace imageURL with imageUrls
  type: string;
  available: boolean;
};
