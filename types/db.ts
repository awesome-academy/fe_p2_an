export type Role = 'admin' | 'user';

export type MultiLanguageText = {
  vi: string;
  en: string;
  [key: string]: string;
};

export type BankAccount = {
  bankName: string;
  accountNumber: string;
  accountHolder?: string;
};

export interface User {
  id: string;
  email: string;
  username: string;
  password?: string;
  phoneNumber?: string;
  role: Role;
  isActive: boolean;
  avatar?: string;
  bankAccount?: BankAccount;
  createdAt: string;
  updatedAt?: string;
}

export interface Tour {
  id: string;
  name: MultiLanguageText;
  description: MultiLanguageText;
  category: MultiLanguageText;
  price: number;
  rating: number;
  ratingCount: number;
  destination: string;
  duration: MultiLanguageText;
  startDate: string;
  included: {
    vi: string[];
    en: string[];
  };
  notIncluded: {
    vi: string[];
    en: string[];
  };
  images: string[];
  isFeatured: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  tourId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;

  user?: User;
  tour?: Tour;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';

export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  guestSize: number;
  totalPrice: number;
  bookingDate: string;
  checkInDate: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  note?: string;
}
