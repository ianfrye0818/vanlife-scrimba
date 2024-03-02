import { Selected } from '@demark-pro/react-booking-calendar';
import { Timestamp } from 'firebase/firestore';

export type Order = {
  card: {
    name: string;
    number: string;
    expiryDate: string;
  };
  vanOrderd: {
    vanName?: string;
    vanId?: string;
    vanImage: string;
  };
  hostid?: string;
  datesReserved: Timestamp[] | Selected[];
  customerInfo: {
    id: string;
    name: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  };
  total: number;
};
