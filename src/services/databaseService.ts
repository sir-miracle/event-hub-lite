import sqliteDatabase from '../database/sqliteDatabase';
import { Event, EventDetails, EventCategory } from '../types';

class DatabaseService {
  // Get all events with optional filtering
  async getEvents(
    page: number = 1,
    category?: EventCategory | 'All',
    searchQuery?: string
  ): Promise<{ events: Event[]; hasMore: boolean; totalCount: number }> {
    try {
      return await sqliteDatabase.getEvents(page, category, searchQuery);
    } catch (error) {
      console.error('Error fetching events from database:', error);
      return { events: [], hasMore: false, totalCount: 0 };
    }
  }

  // Get event by ID
  async getEventById(id: string): Promise<EventDetails | null> {
    try {
      return await sqliteDatabase.getEventById(id);
    } catch (error) {
      console.error('Error fetching event by ID:', error);
      return null;
    }
  }

  // Get favorite events
  async getFavoriteEvents(): Promise<Event[]> {
    try {
      return await sqliteDatabase.getFavoriteEvents();
    } catch (error) {
      console.error('Error fetching favorite events:', error);
      return [];
    }
  }

  // Save events to database
  async saveEvents(events: Event[]): Promise<void> {
    try {
      await sqliteDatabase.saveEvents(events);
    } catch (error) {
      console.error('Error saving events to database:', error);
    }
  }

  // Save event details to database
  async saveEventDetails(eventDetails: EventDetails): Promise<void> {
    try {
      await sqliteDatabase.saveEventDetails(eventDetails);
    } catch (error) {
      console.error('Error saving event details to database:', error);
    }
  }

  // Toggle favorite status
  async toggleFavorite(eventId: string): Promise<boolean> {
    try {
      return await sqliteDatabase.toggleFavorite(eventId);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      return false;
    }
  }

  // Check if event is favorite
  async isFavorite(eventId: string): Promise<boolean> {
    try {
      return await sqliteDatabase.isFavorite(eventId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  // Clear old cached data (older than 7 days)
  async clearOldCache(): Promise<void> {
    try {
      await sqliteDatabase.clearOldCache();
    } catch (error) {
      console.error('Error clearing old cache:', error);
    }
  }
}

export default new DatabaseService();
