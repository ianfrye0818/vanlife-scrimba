export type CartItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageURL?: string;
  type?: string;
  quantity: number;
  uid: string;
};

export type Cart = {
  id: string;
  items: CartItem[];
  uid: string;
  updatedAt: string;
  createdAt: string;
};
