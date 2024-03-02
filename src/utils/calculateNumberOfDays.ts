import { Timestamp } from 'firebase/firestore';

export function calculateNumberOfDays(startDate: Timestamp, endDate: Timestamp) {
  return Math.floor((startDate.seconds - endDate.seconds) / 86400);
}
