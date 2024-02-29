export type Van = {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageURL?: string;
  images: customMetaData[];
  imageBucketPath: string; //replace imageURL with imageUrls
  type: string;
  available: boolean;
  reviews: Review[];
  uid: string;
};

export type customMetaData = {
  url: string;
  metadata: {
    name: string;
    bucket: string;
    contentType: string;
    fullPath: string;
    size: number;
    timeCreated: string;
    updated: string;
  };
};

export type Review = {
  name: string;
  review: string;
  reviewStars: number;
};
