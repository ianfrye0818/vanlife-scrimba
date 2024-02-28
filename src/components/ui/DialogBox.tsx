import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

type DialogBoxProps = {
  dialogTriggerButton: React.ReactNode;
  titleText?: string;
  descriptionText?: string;
  children: React.ReactNode;
  header?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function DialogBox({
  dialogTriggerButton,
  titleText,
  descriptionText,
  children,
  header = false,
  open,
  setOpen,
}: DialogBoxProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{dialogTriggerButton}</DialogTrigger>
      <DialogContent className='bg-white'>
        {header && (
          <DialogHeader>
            {titleText && <DialogTitle className='text-3xl'>{titleText}</DialogTitle>}
            {descriptionText && <DialogDescription>{descriptionText}</DialogDescription>}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}
