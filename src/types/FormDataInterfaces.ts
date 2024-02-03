import { CartItem } from './CartItemInterface';

//extracted so that it could be used throughout the form
export interface FormData {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  itemsOrdered?: CartItem[];
}
