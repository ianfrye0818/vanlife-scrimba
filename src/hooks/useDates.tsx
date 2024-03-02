import { useContext } from 'react';
import { DateContext } from '../context/DateContextProvider';

//export useDates hook
export function useDates() {
  const { selectedDates, setSelectedDates, dialogOpen, setDialogOpen } = useContext(DateContext);
  return { selectedDates, setSelectedDates, dialogOpen, setDialogOpen };
}
