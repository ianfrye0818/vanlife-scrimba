import { Reserved } from '@demark-pro/react-booking-calendar';
import { Timestamp } from 'firebase/firestore';
import { TimeStampReserved, Van } from '../types/VanInterfaces';

export function convertTimeStampToReserved(van: Van) {
  if (!van.reserved) return [] as Reserved[];
  const reserved = van.reserved.map(
    (r: TimeStampReserved | Reserved) =>
      ({
        startDate: (r.startDate as Timestamp).toDate(),
        endDate: (r.endDate as Timestamp).toDate(),
      } as Reserved)
  ) as Reserved[];
  return reserved;
}
