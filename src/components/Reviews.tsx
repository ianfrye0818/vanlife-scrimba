import { useUser } from '../hooks/useUser';
import { Van } from '../types/VanInterfaces';
import { StarIcon, Trash2 } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

type ReviewsProps = {
  van: Van;
};

export default function Reviews({ van }: ReviewsProps) {
  const { user } = useUser();
  // Function to calculate the percentage of each star rating
  const getPercentage = (star: number) => {
    const totalReviews = van.reviews.length;
    const totalStarReviews = van.reviews.reduce(
      (acc, review) => acc + (review.reviewStars === star ? 1 : 0),
      0
    );
    return totalReviews !== 0 ? ((totalStarReviews / totalReviews) * 100).toFixed(0) : 0;
  };

  //TODO: Implement delete review function
  async function deleteReview() {
    console.log('delete review');
  }

  return (
    <div>
      <h3 className='text-xl font-bold mb-4 text-center'>Review Summary</h3>
      <div className='flex gap-3 p-3'>
        <div className='w-1/3 p-3'>
          {/* Summary Box */}
          {/* Total number of reviews */}
          <p>Total Reviews: {van.reviews.length}</p>
          {/* Star Ratings */}
          <div className='flex flex-col mt-4'>
            {[5, 4, 3, 2, 1].map((star) => (
              <div
                key={star}
                className='flex items-center  gap-3 p-2'
              >
                {/* Total number of each star */}
                <p>{star}</p>
                {/* Progress bar */}
                <div className='bg-gray-200 h-4 w-full rounded-full'>
                  {/* Calculate the percentage */}
                  <div
                    className='bg-yellow-500 h-full rounded-full'
                    style={{ width: `${getPercentage(star)}%` }}
                  ></div>
                </div>
                {/* Display the percentage */}
                <p>{getPercentage(star)}%</p>
              </div>
            ))}
          </div>
        </div>
        <ScrollArea className='h-72 w-2/3 rounded-md border py-3'>
          {/* Reviews */}
          {van.reviews.map((review, index) => (
            <div
              key={index}
              className='flex flex-col gap-2 p-3 '
            >
              <p className='font-bold'>{review.name}</p>
              <div className='flex gap-2'>
                {/* Render stars */}
                {Array.from({ length: review.reviewStars }).map((_, index) => (
                  <StarIcon
                    size={15}
                    key={index}
                    className='text-yellow-500'
                    fill='currentColor'
                  />
                ))}
              </div>
              <p>{review.review}</p>
              {van.uid === user?.uid && (
                <div
                  onClick={deleteReview}
                  className='absolute top-2 right-2 bg-red-200 p-2  flex gap-2 items-center cursor-pointer'
                >
                  <Trash2 size={14} /> Delete
                </div>
              )}
              <Separator className='bg-gray-200 h-[1px] w-full mt-2 mb-2' />
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
