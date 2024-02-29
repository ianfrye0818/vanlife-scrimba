import { useQuery } from '@tanstack/react-query';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';
import { getAllDownloadUrlsFromFolder } from '../../firebase/firebaseStorage';
import { Loader2 } from 'lucide-react';

type ImageCarouselProps = {
  imageBucketPath: string;
  mainImage: string;
};

export function ImageCarousel({ imageBucketPath, mainImage }: ImageCarouselProps) {
  const imgQuery = useQuery({
    queryKey: ['images', imageBucketPath],
    queryFn: async () => {
      const data = await getAllDownloadUrlsFromFolder(imageBucketPath);
      return data;
    },
    enabled: imageBucketPath !== null && imageBucketPath !== undefined && imageBucketPath !== '',
  });

  if (imgQuery.isLoading) return <Loader2 />;

  if (imgQuery.isError)
    return (
      <div className='w-full h-full flex flex-col justify-center items-center text-3xl font-bold'>
        Error fetching Images
      </div>
    );

  if (imgQuery.data?.length === 0 || imgQuery.data === undefined || imgQuery.data === null)
    return (
      <div className='w-full h-full flex flex-col justify-center items-center text-3xl font-bold'>
        No images found
      </div>
    );
  return (
    <Carousel className='w-full max-w-xs'>
      <CarouselContent>
        <CarouselItem className='flex flex-col justify-center items-center'>
          <div className='p-1'>
            <img src={mainImage} />
          </div>
        </CarouselItem>
        {imgQuery.data.map(
          (image) =>
            image.url !== mainImage && (
              <CarouselItem
                key={image.url}
                className='flex flex-col justify-center items-center'
              >
                <div className='p-1'>
                  <img
                    src={image.url}
                    alt='Van Image'
                  />
                </div>
              </CarouselItem>
            )
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
