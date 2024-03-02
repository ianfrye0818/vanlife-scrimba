import { Timestamp } from 'firebase/firestore';

export function formatDate(inputDate: Timestamp) {
  const date = inputDate.toDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
