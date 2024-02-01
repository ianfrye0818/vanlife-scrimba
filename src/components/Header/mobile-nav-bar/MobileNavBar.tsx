import React, { useState } from 'react';
import { IoIosMenu } from 'react-icons/io';
import Drawer from '@mui/material/Drawer';
import MobileNavBarLinks from './MobileNavBarLinks';

export default function MobileNavBar() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div>
      <nav>
        <Drawer
          anchor='right'
          open={isOpen}
          onClose={toggleMobileNav(false)}
        >
          <div className='logo'>
            <h1 className='text-center bg-gray-900 text-white py-5'>VanLife</h1>
          </div>
          <MobileNavBarLinks toggleMobileNav={toggleMobileNav} />
        </Drawer>
      </nav>

      <div
        style={{
          zIndex: '999',
          right: '20px',
          top: '20px',
          position: 'absolute',
          marginLeft: 'auto',
          backgroundColor: 'white',
          padding: '8px',
          borderRadius: '50%',
        }}
      >
        <IoIosMenu
          className={`menu-icon`}
          onClick={toggleMobileNav(true)}
        />
      </div>
    </div>
  );
}
