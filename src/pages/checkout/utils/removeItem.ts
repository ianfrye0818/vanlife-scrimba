import { updateItem } from '../../../firebase/firebaseDatabase';
import { Cart, CartItem } from '../../../types/CartItemInterface';

export default async function removeItem(id: string, cart: Cart | undefined) {
  if (!cart) {
    console.error('No cart found');
    return;
  }
  const newItems = cart.items.filter((item: CartItem) => item.id !== id);
  await updateItem('carts', cart.id, { items: newItems });
}
