/* eslint-disable react-hooks/exhaustive-deps */
import Calendar, { Reserved, Selected } from '@demark-pro/react-booking-calendar';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from './dialog';
import { Button } from './button';
import { useDates } from '../../hooks/useDates';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Van } from '../../types/VanInterfaces';
import { Timestamp } from 'firebase/firestore';

type CalendarSchedulerProps = {
  selectedDates: Selected[];
  setSelectedDates: (e: Selected[]) => void;
  addToCart?: () => void;
  buttonClassName: string;
  buttonTitle: string;
  van: Van;
};

//component start
export default function CalendarScheduler({
  selectedDates,
  setSelectedDates,
  addToCart,
  buttonClassName,
  buttonTitle,
  van,
}: CalendarSchedulerProps) {
  const { dialogOpen, setDialogOpen } = useDates();
  useEffect(() => {
    setSelectedDates([]);
  }, [dialogOpen]);
  if (van.reserved === undefined) {
    return <div>Loading...</div>;
  }
  const reserved = van.reserved.map(
    (r) =>
      ({
        startDate: (r.startDate as Timestamp).toDate(),
        endDate: (r.endDate as Timestamp).toDate(),
      } as Reserved)
  ) as Reserved[];
  console.log(reserved);
  console.log(selectedDates);

  const handleChange = (e: Selected[]) => setSelectedDates(e);

  const isDisabled = (date: Date): boolean => {
    const currentDate = new Date();
    return (
      date < currentDate ||
      (reserved !== undefined && reserved.some((r) => date >= r.startDate && date < r.endDate))
    );
  };
  return (
    <div>
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogTrigger asChild>
          <Button className={buttonClassName}>{buttonTitle}</Button>
        </DialogTrigger>
        <DialogContent className='bg-white'>
          <Calendar
            selected={selectedDates}
            onChange={(e) => handleChange(e)}
            onOverbook={() => toast.error('Date not available')}
            disabled={isDisabled}
            reserved={reserved as Reserved[]}
            variant='booking'
            dateFnsOptions={{ weekStartsOn: 1 }}
            range={true}
          />

          <DialogFooter>
            <Button
              className='bg-orange-600 hover:bg-orange-700 text-white hover:text-white'
              onClick={addToCart}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
