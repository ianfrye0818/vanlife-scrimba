import { Box, Drawer, Avatar, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { CartContext } from '../../../../context/CartContextProvider';
import { Link } from 'react-router-dom';
import RemoveItemDialog from '../../../../pages/checkout/components/RemoveItemAlertDialog';
import removeItem from '../../../../pages/checkout/utils/removeItem';

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useContext(CartContext);
  const total = cart?.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  //Set's the state of the mobile nav to open or close
  const toggleCartDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };
  if (!cart) {
    return null;
  }
  return (
    <div>
      <div>
        <Drawer
          anchor='right'
          open={isOpen}
          onClose={toggleCartDrawer(false)}
        >
          <Box
            sx={{
              width: '40vw',
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              backgroundColor: 'black',
            }}
          >
            <div className='w-full h-full flex flex-col gap-10 p-3 bg-black text-white'>
              <h1 className='text-center text-3xl font-bold'>Cart</h1>
              {cart.items.length === 0 ? (
                <h2 className='text-center'>Your cart is empty</h2>
              ) : (
                cart.items.map((item) => (
                  <div
                    key={item.id}
                    className='flex gap-4 items-center  bg-gray-800 p-3 rounded-md'
                  >
                    <Avatar src={item.imageURL}>{item.name[0]}</Avatar>
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>
                      <RemoveItemDialog
                        removeItem={() => removeItem(item.id, cart)}
                        itemId={item.id}
                      />
                    </span>
                    <span className='ml-auto'>${item.price}</span>
                  </div>
                ))
              )}
              {cart.items.length > 0 && (
                <>
                  <div className='flex justify-between items-center bg-gray-600  p-3'>
                    <h2>Total:</h2>
                    <h2>${total}</h2>
                  </div>

                  <Link
                    className=' p-4 bg-orange-500 text-white  text-center mx-auto rounded-md hover:bg-orange-600'
                    to='/cart'
                  >
                    Checkout
                  </Link>
                </>
              )}
            </div>
            <Button
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                fontSize: '1rem',
                color: 'white',
              }}
              onClick={toggleCartDrawer(false)}
            >
              X
            </Button>
          </Box>
        </Drawer>
      </div>

      <div className=''>
        <MdShoppingCart
          size={30}
          className='relative'
          onClick={toggleCartDrawer(true)}
        />
      </div>
    </div>
  );
}
