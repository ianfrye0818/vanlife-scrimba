import { Timestamp } from 'firebase/firestore';
import { CartDB } from '../context/CartContextProvider';
import { updateItem } from '../firebase/firebaseDatabase';

export async function removeItem(cart: CartDB | undefined) {
  if (!cart) {
    console.error('No cart found');
    return;
  }

  await updateItem('carts', cart.id, { van: null, dates: [], updatedAt: Timestamp.now() });
}
