//extracted this out due to being used in both the add to cart and checkout components
export interface CartItem {
  id: string;
  items: {
    id: string;
    name: string;
    price: number;
    description?: string;
    imgUrl?: string;
    type?: string;
    quantity: number;
  }[];
  uid: string;

  // Add other properties as needed
}

//currenlty not being used but could be used to add total in confirmation page or checkout page
export interface CartTotal extends CartItem {
  total: number;
}
