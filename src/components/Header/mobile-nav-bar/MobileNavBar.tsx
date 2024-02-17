import { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import Drawer from '@mui/material/Drawer';
import MobileNavBarLinks from './MobileNavBarLinks';

export default function MobileNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  //Set's the state of the mobile nav to open or close
  const toggleMobileNav = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  //Uses material UI Drawer to create a mobile nav bar - swtiched to ShadCN UI halfway through the project - will come back and refactor to their drawer once project is complete.
  return (
    <div>
      <nav>
        <Drawer
          anchor='right'
          open={isOpen}
          onClose={toggleMobileNav(false)}
        >
          <div className='logo'>
            <h1 className='text-center bg-[#1f1f1f] text-white py-5'>VanLife</h1>
          </div>
          <MobileNavBarLinks toggleMobileNav={toggleMobileNav} />
        </Drawer>
      </nav>

      <div className='lg:hidden z-50 absolute right-4 top-4 ml-auto bg-white p-1 rounded-full '>
        <IoIosMenu
          className={`z-50 h-9 w-9 text-3xl cursor-pointer text-orange-600`}
          onClick={toggleMobileNav(true)}
        />
      </div>
    </div>
  );
}
