export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  startsAt: string;
  city: string;
  price: number;
  thumbnail: string;
}

export interface EventDetails extends Event {
  description: string;
  venue: string;
  speakers: string[];
  capacity: number;
  remaining: number;
}

export type EventCategory =
  | 'Tech'
  | 'Business'
  | 'Health'
  | 'Arts'
  | 'Education';

export interface EventsResponse {
  events: Event[];
  totalCount: number;
  page: number;
  hasMore: boolean;
}

export interface EventDetailsResponse {
  event: EventDetails;
}

export interface CheckoutRequest {
  eventId: string;
  quantity: number;
  buyer: {
    name: string;
    email: string;
  };
}

export interface CheckoutResponse {
  success: boolean;
  reference: string;
}

export interface SearchFilters {
  query: string;
  category: EventCategory | 'All';
  page: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export type RootStackParamList = {
  BottomNavStack: undefined;
  EventDetailsStack: { eventId: string };
  CheckoutStack: { eventId: string };
};

export type BottomTabParamList = {
  Dashboard: undefined;
  Favorites: undefined;
};

export type EventDetailsStackParamList = {
  EventDetails: { eventId: string };
};

export type CheckoutStackParamList = {
  Checkout: { eventId: string };
  CheckoutSuccess: { reference: string };
  CheckoutFailure: undefined;
};

export interface DatabaseEvent {
  id: string;
  title: string;
  category: string;
  startsAt: string;
  city: string;
  price: number;
  thumbnail: string;
  description?: string;
  venue?: string;
  speakers?: string;
  capacity?: number;
  remaining?: number;
  isFavorite: boolean;
  cachedAt: number;
}

export interface PaginationInfo {
  page: number;
  hasMore: boolean;
  totalCount: number;
}

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
}
