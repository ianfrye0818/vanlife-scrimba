import { CartItem } from '../types/CartItemInterface';

export default function calculateTotal(cartItems: CartItem[] | undefined) {
  if (!cartItems) {
    return 0;
  }
  return cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
}
