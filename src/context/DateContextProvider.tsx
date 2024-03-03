/* eslint-disable @typescript-eslint/no-unused-vars */

import { Selected } from '@demark-pro/react-booking-calendar';
import { useState, createContext, PropsWithChildren } from 'react';

export const DateContext = createContext({
  selectedDates: [] as Selected[],
  setSelectedDates: (_dates: Selected[]) => {},
  dialogOpen: false,
  setDialogOpen: (_open: boolean) => {},
});

export default function DateContextProvider({ children }: PropsWithChildren) {
  const [selectedDates, setSelectedDates] = useState<Selected[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Update the state with the provided dates
  const handleSetSelectedDates = (dates: Selected[]) => {
    setSelectedDates(dates);
  };

  return (
    <DateContext.Provider
      value={{ selectedDates, setSelectedDates: handleSetSelectedDates, dialogOpen, setDialogOpen }}
    >
      <div>{children}</div>
    </DateContext.Provider>
  );
}
