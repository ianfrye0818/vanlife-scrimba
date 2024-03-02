import { Timestamp } from 'firebase/firestore';

export function calculateNumberOfDays(startDate: Timestamp, endDate: Timestamp) {
  return Math.floor((endDate.seconds - startDate.seconds) / 86400);
}
