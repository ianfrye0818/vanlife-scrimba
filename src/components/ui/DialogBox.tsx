import { Button } from './button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

type DialogBoxProps = {
  dialogTriggerButton: React.ReactNode;
  titleText?: string;
  descriptionText?: string;
  children: React.ReactNode;
};

export function DialogBox({
  dialogTriggerButton,
  titleText,
  descriptionText,
  children,
}: DialogBoxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTriggerButton}</DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogHeader>
          {titleText && <DialogTitle>{titleText}</DialogTitle>}
          {descriptionText && <DialogDescription>{descriptionText}</DialogDescription>}
        </DialogHeader>
        {children}
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button
              type='button'
              variant='outline'
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
