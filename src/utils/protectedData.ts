import { CheckOutFormData } from '../types/CheckOutFormData';

export type ProtectedData = {
  cardNumber: string;
  cvc: string;
  cardName: string;
  city: string;
  email: string;
  name: string;
  state: string;
  street: string;
  zip: string;
  expiryDate: string;
};

export function protectData(data: CheckOutFormData) {
  const { cardNumber, cvc } = data;
  const protectedCardNumber = '****-****-****-' + cardNumber.slice(-4);
  const protectedCVC = '**' + cvc.slice(-1);

  const protectedData = { ...data, cardNumber: protectedCardNumber, cvc: protectedCVC };

  return protectedData as ProtectedData;
}
