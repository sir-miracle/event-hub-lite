// Accessibility utilities for EventHub Lite

export const AccessibilityLabels = {
  // Navigation
  eventsTab: 'Events tab',
  favoritesTab: 'Favorites tab',
  
  // Event Card
  eventCard: 'Event card',
  favoriteButton: 'Add to favorites',
  removeFavoriteButton: 'Remove from favorites',
  
  // Search and Filters
  searchInput: 'Search events',
  categoryFilter: 'Filter by category',
  clearSearch: 'Clear search',
  
  // Event Details
  eventImage: 'Event image',
  eventTitle: 'Event title',
  eventPrice: 'Event price',
  eventDate: 'Event date',
  eventTime: 'Event time',
  eventVenue: 'Event venue',
  eventDescription: 'Event description',
  speakersList: 'Event speakers',
  availabilityStatus: 'Event availability',
  checkoutButton: 'Get tickets',
  waitlistButton: 'Join waitlist',
  
  // Checkout
  nameInput: 'Full name',
  emailInput: 'Email address',
  quantityInput: 'Number of tickets',
  submitButton: 'Complete purchase',
  
  // Status Messages
  loading: 'Loading',
  error: 'Error occurred',
  noEvents: 'No events found',
  noFavorites: 'No favorite events',
  networkError: 'Network connection error',
  paymentSuccess: 'Payment successful',
  paymentFailed: 'Payment failed',
};

export const AccessibilityHints = {
  favoriteButton: 'Double tap to add or remove from favorites',
  checkoutButton: 'Double tap to proceed to checkout',
  searchInput: 'Type to search for events',
  categoryFilter: 'Select a category to filter events',
  quantityInput: 'Enter number of tickets between 1 and 10',
};

// Helper function to create accessibility props
export const createAccessibilityProps = (label: string, hint?: string) => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'button' as const,
});

// Helper function for text accessibility
export const createTextAccessibilityProps = (label: string) => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityRole: 'text' as const,
});

// Helper function for input accessibility
export const createInputAccessibilityProps = (label: string, hint?: string) => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'textbox' as const,
});

// Dynamic type support
export const getDynamicFontSize = (baseSize: number, scaleFactor: number = 1) => {
  // This would integrate with the system's dynamic type settings
  // For now, return the base size with a scale factor
  return baseSize * scaleFactor;
};

// High contrast support
export const getHighContrastColors = (isHighContrast: boolean) => {
  if (isHighContrast) {
    return {
      primary: '#000000',
      secondary: '#FFFFFF',
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: '#000000',
      textSecondary: '#333333',
    };
  }
  
  return {
    primary: '#2563EB',
    secondary: '#6B7280',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#0F172A',
    textSecondary: '#475569',
  };
};
