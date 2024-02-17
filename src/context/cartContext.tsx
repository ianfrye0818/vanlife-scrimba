import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { addItem, queryItem } from '../firebase/firebaseDatabase';
import { AuthContext } from './AuthContextProvider';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Cart } from '../types/CartItemInterface';

export const CartContext = createContext<Cart | null>(null);

export default function CartContextProvider({ children }: PropsWithChildren) {
  const cartState = useContext(CartContext);
  const [cart, setCart] = useState<Cart | null>(cartState);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getCart() {
      if (user) {
        const cartId = await queryItem('cartss', 'uid', user.uid);
        if (cartId) {
          const unsubscribe = onSnapshot(doc(db, 'cart', cartId[0].id), (doc) => {
            if (doc.exists()) {
              setCart(doc.data() as Cart);
            }
          });
          return unsubscribe;
        }
        //else create cart for user and subscribe to changes
        else {
          const newCart = await addItem('cart', { items: [], uid: user.uid });
          if (newCart) {
            const unsubscribe = onSnapshot(doc(db, 'cart', newCart), (doc) => {
              if (doc.exists()) {
                setCart(doc.data() as Cart);
              }
            });
            return unsubscribe;
          }
        }
      }
      //else if no user create a cart with blank user id and subscribe
      else {
        const newCart = await addItem('cart', { items: [], uid: '' });
        if (newCart) {
          const unsubscribe = onSnapshot(doc(db, 'cart', newCart), (doc) => {
            if (doc.exists()) {
              setCart(doc.data() as Cart);
            }
          });
          return unsubscribe;
        }
      }
    }

    getCart();
  }, [user, setCart]);
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}
