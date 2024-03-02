//shutting up eslint from making me add a dependency array - TODO: fix this
/* eslint-disable react-hooks/exhaustive-deps */

//library imports
import Calendar from '@demark-pro/react-booking-calendar';
import { useEffect } from 'react';

//custom imports
import { convertTimeStampToReserved } from '../../utils/convertTimeStampToReserved';
//component imports
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from './dialog';
import { Button } from './button';
import { toast } from 'sonner';
import ReactLoading from 'react-loading';

//type imports
import { Reserved, Selected } from '@demark-pro/react-booking-calendar';

//custom hook imports
import { useDates } from '../../hooks/useDates';
import { Van } from '../../types/VanInterfaces';

type CalendarSchedulerProps = {
  selectedDates: Selected[];
  setSelectedDates: (e: Selected[]) => void;
  callback?: () => void;
  buttonClassName: string;
  buttonTitle: string;
  van: Van;
};

export default function CalendarScheduler({
  selectedDates,
  setSelectedDates,
  callback,
  buttonClassName,
  buttonTitle,
  van,
}: CalendarSchedulerProps) {
  const { dialogOpen, setDialogOpen } = useDates();

  //useeffect for setting the state of selected dates to an empty array when the dialog is closed
  useEffect(() => {
    setSelectedDates([]);
  }, [dialogOpen]);

  //if the van is still loading, return a loading message
  if (van.reserved === undefined) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <ReactLoading
          type='bubbles'
          color='green'
          height={300}
          width={375}
        />
      </div>
    );
  }

  //global reserv variable
  const reserved = convertTimeStampToReserved(van);

  //takes in dates to see if they should be disabled on calendar picker
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
            onChange={(e) => setSelectedDates(e)}
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
              onClick={callback}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
