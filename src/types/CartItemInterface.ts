export interface CartItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageURL?: string;
  type?: string;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  uid: string;
  updatedAt: string;
  createdAt: string;
}
1;
