export type Van = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageURL?: string;
  imageUrls?: string[]; //replace imageURL with imageUrls
  type: string;
  available: boolean;
};
