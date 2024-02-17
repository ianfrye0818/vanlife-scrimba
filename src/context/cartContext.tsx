import { PropsWithChildren, createContext, useContext, useEffect, useState, useRef } from 'react';
import { addItem, queryItem, updateItem } from '../firebase/firebaseDatabase'; // Assuming you have an updateItem function
import { AuthContext } from './AuthContextProvider';
import { Timestamp, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Cart, CartItem } from '../types/CartItemInterface';

export const CartContext = createContext<Cart | null>(null);

export type newCart = {
  items: CartItem[] | [];
  uid: string;
  updatedAt: Timestamp;
  createdAt: Timestamp;
};

export default function CartContextProvider({ children }: PropsWithChildren) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartLoaded, setCartLoaded] = useState(false);
  const cartId = useRef<string | null>(null);

  useEffect(() => {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      cartId.current = storedCartId;
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isMounted = true;
    async function createCartFromExistingCart(userCartId: string) {
      const unsubscribe = onSnapshot(doc(db, 'carts', userCartId), (doc) => {
        if (doc.exists()) {
          setCart({ ...doc.data(), id: doc.id } as Cart);
        }
      });
      return unsubscribe;
    }

    async function createNewCart() {
      //if there is no cart create new cart
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
        const unsubscribe = onSnapshot(doc(db, 'carts', newCartId), (doc) => {
          if (doc.exists()) {
            setCart({ ...doc.data(), id: doc.id } as Cart);
          }
        });
        return unsubscribe;
      }
    }

    async function getUserCart() {
      const userCartId = await queryItem('carts', 'uid', user!.uid);
      if (userCartId) {
        cartId.current = userCartId[0].id;
        localStorage.setItem('cartId', userCartId[0].id);
        setCartLoaded(true);
        return createCartFromExistingCart(userCartId[0].id);
      } else {
        return createNewCart();
      }
    }

    //if user is logged in, grab their cart from the database
    if (user && !cartLoaded) {
      getUserCart();
    }

    if (!user && !cartLoaded && cartId.current) {
      createCartFromExistingCart(cartId.current);
      setCartLoaded(true);
    }

    if (user && cartLoaded && cartId.current && cart && cart.uid !== user.uid) {
      updateItem('carts', cartId.current, { uid: user.uid, updatedAt: Timestamp.now() });
    }
  }, [user, cartLoaded, cart]);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

// export function useCart() {
//   const cart = useContext(CartContext);
//   if (!cart) {
//     throw new Error('useCart must be used within a CartContextProvider');
//   }
//   return { cart };
// }
