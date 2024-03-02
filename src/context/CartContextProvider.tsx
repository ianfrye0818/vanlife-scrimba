import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'; // Assuming you have configured Firebase
import { db, auth } from '../firebase/firebaseConfig';
import { Selected } from '@demark-pro/react-booking-calendar';
import { Van } from '../types/VanInterfaces';
export interface Cart {
  van: Van | null;
  uid: string;
  dates: Selected[] | Timestamp[];
  updatedAt: Timestamp;
  createdAt: Timestamp;
}
export interface CartDB extends Cart {
  id: string;
}

interface CartContextType {
  cart: CartDB | null;
  loading: boolean;
}

export const CartContext = createContext<CartContextType>({
  cart: null,
  loading: true,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartDB | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //create a callback to create cart if it doesn't exist

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        const q = query(collection(db, 'carts'), where('uid', '==', uid));

        try {
          const snapshot = await getDocs(q);
          if (!snapshot.empty) {
            const docData = snapshot.docs.map((doc) => {
              return { ...doc.data(), id: doc.id } as CartDB;
            });
            setCart({ ...docData[0], id: docData[0].id } as CartDB);
            setLoading(false);
          } else {
            const newCart: Cart = {
              dates: [],
              van: null,
              uid: uid,
              updatedAt: Timestamp.now(),
              createdAt: Timestamp.now(),
            };

            const newCartRef = await addDoc(collection(db, 'carts'), newCart);
            setCart({ ...newCart, id: newCartRef.id } as CartDB);
            setLoading(false);
          }

          // Subscribe to changes in the cart collection
          const unsubscribeCart = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === 'modified') {
                const updatedCart = { ...change.doc.data(), id: change.doc.id } as CartDB;
                setCart(updatedCart);
              }
            });
          });

          // Clean up the subscription when component unmounts
          return () => unsubscribeCart();
        } catch (error) {
          console.error('Error fetching cart:', error);
          setLoading(false);
        }
      } else {
        setCart(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return <CartContext.Provider value={{ cart, loading }}>{children}</CartContext.Provider>;
};

export default CartProvider;
