//library imports
import { PropsWithChildren, createContext, useContext, useEffect, useState, useRef } from 'react';
import { Timestamp, doc, onSnapshot } from 'firebase/firestore';

//custom imoports
import { addItem, queryItem, updateItem } from '../firebase/firebaseDatabase';
import { AuthContext } from './AuthContextProvider';
import { db } from '../firebase/firebaseConfig';

//type imports
import { Cart, CartItem } from '../types/CartItemInterface';

//create cart context
export const CartContext = createContext<Cart | null>(null);

//create cart type
export type newCart = {
  items: CartItem[] | [];
  uid: string;
  updatedAt: Timestamp;
  createdAt: Timestamp;
};

//create cart context provider
export default function CartContextProvider({ children }: PropsWithChildren) {
  //get user from auth context
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartLoaded, setCartLoaded] = useState(false);
  const cartId = useRef<string | null>(null);

  useEffect(() => {
    //get cart id from local storage
    const storedCartId = localStorage.getItem('cartId');
    //if cart id is stored in local storage set it to cartId
    if (storedCartId) {
      cartId.current = storedCartId;
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //variable to not start creating cart until auth context is mounted
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isMounted = true;
    //function to create cart from existing cart
    async function createCartFromExistingCart(userCartId: string) {
      //set cart id to user cart id
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
      //add new cart to database
      const newCartId = await addItem('carts', newCart);
      //if new cart is created set cartId to new cart id
      if (newCartId) {
        //set cart id to new cart id
        cartId.current = newCartId;
        //store cart id in local storage
        localStorage.setItem('cartId', newCartId);
        //set cart loaded to true
        setCartLoaded(true);
        //listen for changes to cart
        const unsubscribe = onSnapshot(doc(db, 'carts', newCartId), (doc) => {
          if (doc.exists()) {
            setCart({ ...doc.data(), id: doc.id } as Cart);
          }
        });
        return unsubscribe;
      }
    }

    async function getUserCart() {
      //get user cart id from database
      const userCartId = await queryItem('carts', 'uid', user!.uid);
      //if user has a cart, create cart from existing cart
      if (userCartId) {
        cartId.current = userCartId[0].id;
        //store cart id in local storage
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
    //if user is not logged in, create a new cart
    if (!user && !cartLoaded && cartId.current) {
      createCartFromExistingCart(cartId.current);
      setCartLoaded(true);
    }
    //cleanup function
    if (user && cartLoaded && cartId.current && cart && cart.uid !== user.uid) {
      updateItem('carts', cartId.current, { uid: user.uid, updatedAt: Timestamp.now() });
    }
  }, [user, cartLoaded, cart]);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

//throws errors -> may come back to this later
// export function useCart() {
//   const cart = useContext(CartContext);
//   if (!cart) {
//     throw new Error('useCart must be used within a CartContextProvider');
//   }
//   return { cart };
// }
