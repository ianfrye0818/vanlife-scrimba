import { Timestamp } from 'firebase/firestore';
import { CartDB } from '../context/CartContextProvider';
import { calculateNumberOfDays } from './calculateNumberOfDays';

export default function calculateTotal(cart: CartDB | null) {
  if (!cart) return 0;
  if (!cart.van) return 0;
  if (!cart.van.price) return 0;
  return (
    calculateNumberOfDays(cart.dates[0] as Timestamp, cart.dates[1] as Timestamp) * cart?.van?.price
  );
}
