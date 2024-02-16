//extracted this out due to being used in both the add to cart and checkout components
export interface CartItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imgUrl?: string;
  type?: string;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  uid: string;
}

//currenlty not being used but could be used to add total in confirmation page or checkout page
export interface CartTotal extends CartItem {
  total: number;
}
