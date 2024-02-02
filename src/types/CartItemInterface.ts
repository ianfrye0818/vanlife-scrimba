export interface CartItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imgUrl?: string;
  type?: string;
  quantity: number;
  // Add other properties as needed
}

export interface CartTotal extends CartItem {
  total: number;
}
