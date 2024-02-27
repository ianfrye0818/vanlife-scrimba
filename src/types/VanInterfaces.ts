import { metaData } from '../firebase/firebaseStorage';

export type Van = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageURL?: string;
  images: customMetaData[]; //replace imageURL with imageUrls
  type: string;
  available: boolean;
};

export type customMetaData = {
  url: string;
  metadata: {
    name: string;
    bucket: string;
    contentType: string;
    fullPath: string;
    size: number;
    timeCreated: string;
    updated: string;
  };
};
