import {
  EventsResponse,
  EventDetailsResponse,
  CheckoutRequest,
  CheckoutResponse,
  EventDetails,
  EventCategory,
} from '../types';

// Import mock data
import eventsData from '../data/events.json';
import event001Data from '../data/event_001.json';
import event002Data from '../data/event_002.json';
import event003Data from '../data/event_003.json';

class MockApiService {
  private baseDelay = 500; // Base delay in ms
  private failureRate = 0.1; // 10% failure rate

  // Simulate network delay and random failures
  private async simulateNetworkCall<T>(data: T): Promise<T> {
    // Random delay between 300-800ms
    const delay = this.baseDelay + Math.random() * 500;

    await new Promise(resolve => setTimeout(resolve, delay));

    // Simulate 10% failure rate
    if (Math.random() < this.failureRate) {
      throw new Error('Network request failed. Please try again.');
    }

    return data;
  }

  // GET /events?page={n}&q={text?}&category={name?}
  async getEvents(
    page: number = 1,
    searchQuery?: string,
    category?: EventCategory | 'All',
  ): Promise<EventsResponse> {
    try {
      let filteredEvents = [...eventsData.events];

      // Apply search filter
      if (searchQuery) {
        filteredEvents = filteredEvents.filter(event =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      // Apply category filter
      if (category && category !== 'All') {
        filteredEvents = filteredEvents.filter(
          event => event.category === category,
        );
      }

      // Apply pagination
      const pageSize = 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

      const response: EventsResponse = {
        events: paginatedEvents,
        totalCount: filteredEvents.length,
        page,
        hasMore: endIndex < filteredEvents.length,
      };

      return await this.simulateNetworkCall(response);
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  // GET /events/{id}
  async getEventDetails(eventId: string): Promise<EventDetailsResponse> {
    try {
      // Find the base event data
      const baseEvent = eventsData.events.find(event => event.id === eventId);
      if (!baseEvent) {
        throw new Error('Event not found');
      }

      // Get detailed data based on event ID
      let detailedData;
      switch (eventId) {
        case 'evt_001':
          detailedData = event001Data;
          break;
        case 'evt_002':
          detailedData = event002Data;
          break;
        case 'evt_003':
          detailedData = event003Data;
          break;
        default:
          // Generate mock detailed data for other events
          detailedData = {
            id: eventId,
            title: baseEvent.title,
            description: `Detailed description for ${baseEvent.title}. This is a comprehensive event that covers all aspects of the topic.`,
            venue: `${baseEvent.category} Center, ${baseEvent.city}`,
            speakers: ['Speaker One', 'Speaker Two', 'Speaker Three'],
            capacity: Math.floor(Math.random() * 200) + 50,
            remaining: Math.floor(Math.random() * 50) + 10,
          };
      }

      const eventDetails: EventDetails = {
        ...baseEvent,
        ...detailedData,
      };

      const response: EventDetailsResponse = {
        event: eventDetails,
      };

      return await this.simulateNetworkCall(response);
    } catch (error) {
      console.error('Error fetching event details:', error);
      throw error;
    }
  }

  // POST /checkout
  async checkout(checkoutData: CheckoutRequest): Promise<CheckoutResponse> {
    try {
      // Validate required fields
      if (
        !checkoutData.eventId ||
        !checkoutData.quantity ||
        !checkoutData.buyer.name ||
        !checkoutData.buyer.email
      ) {
        throw new Error('Missing required checkout information');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(checkoutData.buyer.email)) {
        throw new Error('Invalid email format');
      }

      // Validate quantity
      if (checkoutData.quantity <= 0 || checkoutData.quantity > 10) {
        throw new Error('Invalid quantity. Must be between 1 and 10');
      }

      // Generate reference number
      const reference = `EH-2025-${String(
        Math.floor(Math.random() * 1000000),
      ).padStart(6, '0')}`;

      const response: CheckoutResponse = {
        success: true,
        reference,
      };

      return await this.simulateNetworkCall(response);
    } catch (error) {
      console.error('Error processing checkout:', error);
      throw error;
    }
  }

  // Get available categories
  getCategories(): EventCategory[] {
    return ['Tech', 'Business', 'Health', 'Arts', 'Education'];
  }

  // Check if event is sold out (mock logic)
  async isEventSoldOut(eventId: string): Promise<boolean> {
    try {
      const eventDetails = await this.getEventDetails(eventId);
      return eventDetails.event.remaining === 0;
    } catch (error) {
      console.error('Error checking if event is sold out:', error);
      return false;
    }
  }

  // Get event availability status
  async getEventAvailability(
    eventId: string,
  ): Promise<'available' | 'limited' | 'sold_out'> {
    try {
      const eventDetails = await this.getEventDetails(eventId);
      const { remaining } = eventDetails.event;

      if (remaining === 0) return 'sold_out';
      if (remaining < 10) return 'limited';
      return 'available';
    } catch (error) {
      console.error('Error checking event availability:', error);
      return 'available';
    }
  }
}

export default new MockApiService();
