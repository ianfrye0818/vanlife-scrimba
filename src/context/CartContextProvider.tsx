//library imports
import { PropsWithChildren, createContext, useEffect, useState, useRef } from 'react';
import { Timestamp, doc, onSnapshot } from 'firebase/firestore'; // Importing Firestore functionalities
import { addItem, queryItem, updateItem } from '../firebase/firebaseDatabase'; // Importing database functions

//custom imports
import { db } from '../firebase/firebaseConfig'; // Importing Firebase database instance
import { useUser } from '../hooks/useUser';

//types imports
import { Cart } from '../types/CartItemInterface'; // Importing Cart interface

// Creating a context for the Cart
export const CartContext = createContext<Cart | null>(null);

export default function CartContextProvider({ children }: PropsWithChildren) {
  const { user } = useUser(); // Getting user from AuthContext
  const [cart, setCart] = useState<Cart | null>(null); // State for cart
  const [cartLoaded, setCartLoaded] = useState(false); // State for cart loading status
  const cartId = useRef<string | null>(null); // Reference for cart ID
  useEffect(() => {
    // Effect to retrieve cart ID from local storage
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      cartId.current = storedCartId;
    }
  }, []);

  useEffect(() => {
    // Effect for handling user and cart changes
    async function createCartFromId(cartId: string) {
      const unsubscribe = onSnapshot(doc(db, 'carts', cartId), (doc) => {
        if (doc.exists()) {
          setCart({ ...doc.data(), id: doc.id } as Cart);
        }
      });
      return unsubscribe;
    }

    async function createNewCart() {
      // Creating a new cart if none exists
      const newCart = {
        items: [],
        uid: '',
        updatedAt: Timestamp.now(),
        createdAt: Timestamp.now(),
      };
      const newCartId = await addItem('carts', newCart);
      if (newCartId) {
        cartId.current = newCartId;
        localStorage.setItem('cartId', newCartId);
        setCartLoaded(true);
        return createCartFromId(newCartId);
      }
    }

    async function getUserCart() {
      // Retrieving user's cart if it exists
      const userCartId = await queryItem('carts', 'uid', user!.uid);
      if (userCartId) {
        cartId.current = userCartId[0].id;
        localStorage.setItem('cartId', userCartId[0].id);
        setCartLoaded(true);
        return createCartFromId(userCartId[0].id);
      } else {
        // Creating a new cart if user's cart doesn't exist
        return createNewCart();
      }
    }

    async function handleUserAndCartChanges() {
      // Handling changes in user and cart
      if (user && !cartLoaded) {
        // If user is logged in and cart is not loaded
        await getUserCart();
      }
      if (!user && !cartLoaded && cartId.current) {
        // If user is not logged in, cart is not loaded, and there's a cart ID available
        await createCartFromId(cartId.current);
        setCartLoaded(true);
      }
      if (user && cartLoaded && cartId.current && cart && cart.uid !== user.uid) {
        // If user is logged in, cart is loaded, cart ID is available, and cart belongs to a different user
        await updateItem('carts', cartId.current, { uid: user.uid, updatedAt: Timestamp.now() });
      }
    }

    handleUserAndCartChanges(); // Call to handle user and cart changes
  }, [user, cartLoaded, cart]); // Dependencies for the effect

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>; // Returning the provider with cart value
}
