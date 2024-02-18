import { Link } from 'react-router-dom';

export default function NoCartPage() {
  return (
    <main>
      <div className='container h-[calc(100vh-400px)] flex flex-col items-center justify-center mx-auto text-center my-20'>
        <h1 className='text-4xl font-bold mb-4'>No items in cart</h1>
        <p className='text-lg'>
          You have no items in your cart. Please add some items to your cart.
        </p>
        <Link
          to='/vans'
          className='mt-4 text-blue-500 underline'
        >
          Return to Vans
        </Link>
      </div>
    </main>
  );
}
