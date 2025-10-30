export type Booking = {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  user?: {
    _id: string;
    name: string;
    email?: string;
  };
  hotelRoom?: {
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
    discount?: number;
    description?: string;
    type: string;
    coverImage?: {
      url: string;
      alt?: string;
    };
    images?: Array<{
      url: string;
      alt?: string;
    }>;
  };
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
  status?: string; // ✅ ADDED
  bookingDate?: string; // ✅ ADDED
};
