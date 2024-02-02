import { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

// Define types for your items in the cart
interface CartItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  imgUrl?: string;
  type?: string;
  // Add other properties as needed
}

// Define the action types
type CartAction = { type: 'ADD'; payload: CartItem } | { type: 'REMOVE'; payload: { id: string } };

// Define the type for your context
interface CartContextProps {
  cart: CartItem[];
  dispatch: Dispatch<CartAction>;
}

// Create the context with an initial value of null (this will be overridden by the provider)
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Define the reducer function
const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'REMOVE':
      return state.filter((item) => item.id !== action.payload.id);
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
