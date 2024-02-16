//TODO: fix warning below
/* eslint-disable no-case-declarations */

//library imports
import { createContext, useReducer, useContext, ReactNode, Dispatch, useEffect } from 'react';

//component imports
import { CartItem, Cart } from '../types/CartItemInterface';
import { addItem, queryItem, updateItem } from '../firebase/firebaseDatabase';
import { AuthContext } from '../context/AuthContextProvider';

// Define the action types
type CartAction =
  | { type: 'ADD'; payload: CartItem }
  | { type: 'REMOVE'; payload: { id: string } }
  | { type: 'CLEAR'; payload: { id: string } };

// Define the type for your context
interface CartContextProps {
  cart: CartItem[];
  dispatch: Dispatch<CartAction>;
}

// Create the context with an initial value of null (this will be overridden by the provider)
const CartContext = createContext<CartContextProps | undefined>(undefined);

//TODO - Can probably refactor some of the logic below to make it more readable
// Define the reducer function
const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  const itemInCart = state.find((item) => item.id === action.payload.id);
  switch (action.type) {
    case 'ADD':
      if (itemInCart) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    case 'REMOVE':
      if (itemInCart) {
        return state.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return state.filter((item) => item.id !== action.payload.id);
      }
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

// Define the type for the CartProvider props
interface CartProviderProps {
  children: ReactNode;
}

// Create the CartProvider component
function CartProvider({ children }: CartProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user && user.uid) {
          const cartSnapshot = (await queryItem('carts', 'uid', user.uid)) as [Cart];
          if (cartSnapshot) {
            cartSnapshot[0].items.forEach((item: CartItem) => {
              dispatch({ type: 'ADD', payload: item });
            });
          } else {
            await addItem('carts', { uid: user.uid, items: [] });
          }
        }
      } catch (error) {
        console.log('Error fetching cart', error);
      }
    };
    fetchCart();
  }, [user]);

  useEffect(() => {
    const updateCart = async () => {
      try {
        //update cart in database

        if (user && user.uid) {
          const cartref = await queryItem('carts', 'uid', user.uid);
          if (cartref === null) return;

          await updateItem('carts', cartref[0].id, { items: [...cart] });
        }
      } catch (error) {
        console.log('Error updating cart', error);
      }
    };

    updateCart();
  }, [cart, user]);

  return <CartContext.Provider value={{ cart, dispatch }}>{children}</CartContext.Provider>;
}

// Define the useCart hook
const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
