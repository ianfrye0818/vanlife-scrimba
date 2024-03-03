import { Order } from './Order';

export type UserData = {
  name: string;
  email: string;
  password: string;
  hostId: string;
  hostVans: string[];
  orders: Order[];
  transactions: string[];
};
