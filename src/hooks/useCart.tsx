import { useContext } from 'react';
import { CartContext } from '../context/CartContextProvider';

export function useCart() {
  const cart = useContext(CartContext);

  return { cart };
}
