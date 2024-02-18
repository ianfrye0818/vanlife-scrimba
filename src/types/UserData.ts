import { Order } from './CheckOutFormData';

export interface UserData {
  name: string;
  email: string;
  password: string;
  hostId: string;
  hostVans: string[];
  orders: Order[];
  transactions: string[];
}
