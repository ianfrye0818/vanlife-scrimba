import { CartDB } from '../context/CartContextProvider';
import { addItem } from '../firebase/firebaseDatabase';
import { ProtectedData } from './protectedData';

export async function createOrder(
  protectedData: ProtectedData,
  cart: CartDB,
  userId: string,
  total: number
) {
  const newOrder = {
    card: {
      name: protectedData.cardName,
      number: protectedData.cardNumber,
      expiryDate: protectedData.expiryDate,
    },
    vanOrderd: {
      vanName: cart?.van?.name,
      vanId: cart?.van?.id,
    },
    hostid: cart.van?.uid,
    datesReserved: cart.dates,
    customerInfo: {
      id: userId,
      name: protectedData.name,
      email: protectedData.email,
      address: {
        street: protectedData.street,
        city: protectedData.city,
        zip: protectedData.zip,
      },
    },
    total,
  };
  const orderId = await addItem('orders', newOrder);
  return orderId;
}
