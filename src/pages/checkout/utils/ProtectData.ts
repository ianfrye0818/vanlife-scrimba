import { CheckOutFormData } from '../../../types/CheckOutFormData';

export default function protectData(data: CheckOutFormData) {
  const { cardNumber, cvc } = data;
  const protectedCardNumber = '****-****-****-' + cardNumber.slice(-4);
  const protectedCVC = '**' + cvc.slice(-1);

  const protectedData = { ...data, cardNumber: protectedCardNumber, cvc: protectedCVC };

  return protectedData;
}
