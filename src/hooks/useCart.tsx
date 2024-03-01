import { useContext } from 'react';
import { CartContext } from '../context/CartContextProvider';

export function useCart() {
  const { cart, loading } = useContext(CartContext);

  return { cart, loading };
}
