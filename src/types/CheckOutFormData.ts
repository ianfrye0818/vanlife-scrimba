import { Cart } from './CartItemInterface';

export interface CheckOutFormData {
  cardName: string;
  cardNumber: string;
  cvc: string;
  city: string;
  email: string;
  name: string;
  state: string;
  street: string;
  zip: string;
  expiryDate: string;
}

export interface Order extends CheckOutFormData {
  cart: Cart;
  user: string;
  total: number;
}
