import { CartDB } from '../context/CartContextProvider';

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
  cart: CartDB;
  user: string;
  total: number;
}
