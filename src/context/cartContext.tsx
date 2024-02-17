import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { addItem, queryItem, updateItem } from '../firebase/firebaseDatabase'; // Assuming you have an updateItem function
import { AuthContext } from './AuthContextProvider';
import { Timestamp, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Cart } from '../types/CartItemInterface';

export const CartContext = createContext<Cart | null>(null);

export default function CartContextProvider({ children }: PropsWithChildren) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    async function initializeCart() {
      try {
        let cartId: string;
        // Check if user is logged in
        if (user) {
          // Query cart based on user ID
          const cartQuery = await queryItem('carts', 'uid', user.uid);

          if (cartQuery && cartQuery.length > 0) {
            // Cart already exists, set it as current cart
            cartId = cartQuery[0].id;
          } else {
            // Cart doesn't exist, create a new one
            const newCart = await addItem('carts', { items: [], uid: user.uid });
            cartId = newCart as string;
          }
        } else {
          // User not logged in, create a cart with blank user ID
          const newCart = await addItem('carts', { items: [], uid: '' });
          cartId = newCart as string;
        }

        if (cartId) {
          const unsubscribe = onSnapshot(doc(db, 'carts', cartId), (snapshot) => {
            if (snapshot.exists()) {
              setCart({ ...snapshot.data(), id: cartId, updatedAt: Timestamp.toString() } as Cart);
            }
          });
          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Error initializing cart:', error);
        // Handle error (e.g., show a notification to the user)
      }
    }

    initializeCart();
  }, [user]);

  // When the user changes, update the cart with the new user ID
  useEffect(() => {
    async function updateCartWithUser() {
      try {
        if (user && cart && cart.uid !== user.uid) {
          // Update cart with user ID
          await updateItem('carts', cart.id, { uid: user.uid });
        }
      } catch (error) {
        console.error('Error updating cart with user:', error);
        // Handle error (e.g., show a notification to the user)
      }
    }

    updateCartWithUser();
  }, [user, cart]);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  return { cart };
}
