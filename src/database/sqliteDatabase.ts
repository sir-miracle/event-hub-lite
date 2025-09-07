import SQLite from 'react-native-sqlite-storage';
import { Event, EventDetails, EventCategory } from '../types';

// Enable promise-based API
SQLite.enablePromise(true);

class SQLiteDatabase {
  private db: any | null = null;
  private readonly DB_NAME = 'EventHubLite.db';

  async initDatabase(): Promise<void> {
    try {
      this.db = await SQLite.openDatabase({
        name: this.DB_NAME,
        location: 'default',
      });

      await this.createTables();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const createEventsTable = `
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        starts_at TEXT NOT NULL,
        city TEXT NOT NULL,
        price INTEGER NOT NULL,
        thumbnail TEXT NOT NULL,
        description TEXT,
        venue TEXT,
        speakers TEXT,
        capacity INTEGER,
        remaining INTEGER,
        is_favorite INTEGER DEFAULT 0,
        cached_at INTEGER NOT NULL
      );
    `;

    try {
      await this.db.executeSql(createEventsTable);
      console.log('Events table created successfully');
    } catch (error) {
      console.error('Error creating events table:', error);
      throw error;
    }
  }

  async closeDatabase(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
      console.log('Database closed successfully');
    }
  }

  // Get all events with optional filtering
  async getEvents(
    page: number = 1,
    category?: EventCategory | 'All',
    searchQuery?: string
  ): Promise<{ events: Event[]; hasMore: boolean; totalCount: number }> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      let whereClause = '1=1';
      const params: any[] = [];

      // Apply category filter
      if (category && category !== 'All') {
        whereClause += ' AND category = ?';
        params.push(category);
      }

      // Apply search filter
      if (searchQuery) {
        whereClause += ' AND title LIKE ?';
        params.push(`%${searchQuery}%`);
      }

      // Get total count
      const countQuery = `SELECT COUNT(*) as count FROM events WHERE ${whereClause}`;
      const countResult = await this.db.executeSql(countQuery, params);
      const totalCount = countResult[0].rows.item(0).count;

      // Get paginated results
      const pageSize = 10;
      const offset = (page - 1) * pageSize;
      const query = `
        SELECT * FROM events 
        WHERE ${whereClause} 
        ORDER BY cached_at DESC 
        LIMIT ? OFFSET ?
      `;
      
      const result = await this.db.executeSql(query, [...params, pageSize, offset]);
      const events: Event[] = [];

      for (let i = 0; i < result[0].rows.length; i++) {
        const row = result[0].rows.item(i);
        events.push({
          id: row.id,
          title: row.title,
          category: row.category as EventCategory,
          startsAt: row.starts_at,
          city: row.city,
          price: row.price,
          thumbnail: row.thumbnail,
        });
      }

      const hasMore = offset + pageSize < totalCount;

      return { events, hasMore, totalCount };
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  // Get event by ID
  async getEventById(id: string): Promise<EventDetails | null> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const query = 'SELECT * FROM events WHERE id = ?';
      const result = await this.db.executeSql(query, [id]);

      if (result[0].rows.length === 0) {
        return null;
      }

      const row = result[0].rows.item(0);
      return {
        id: row.id,
        title: row.title,
        category: row.category as EventCategory,
        startsAt: row.starts_at,
        city: row.city,
        price: row.price,
        thumbnail: row.thumbnail,
        description: row.description || '',
        venue: row.venue || '',
        speakers: row.speakers ? JSON.parse(row.speakers) : [],
        capacity: row.capacity || 0,
        remaining: row.remaining || 0,
      };
    } catch (error) {
      console.error('Error fetching event by ID:', error);
      throw error;
    }
  }

  // Get favorite events
  async getFavoriteEvents(): Promise<Event[]> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const query = 'SELECT * FROM events WHERE is_favorite = 1 ORDER BY cached_at DESC';
      const result = await this.db.executeSql(query);

      const events: Event[] = [];
      for (let i = 0; i < result[0].rows.length; i++) {
        const row = result[0].rows.item(i);
        events.push({
          id: row.id,
          title: row.title,
          category: row.category as EventCategory,
          startsAt: row.starts_at,
          city: row.city,
          price: row.price,
          thumbnail: row.thumbnail,
        });
      }

      return events;
    } catch (error) {
      console.error('Error fetching favorite events:', error);
      throw error;
    }
  }

  // Save events to database
  async saveEvents(events: Event[]): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      await this.db.transaction(async (tx: any) => {
        for (const event of events) {
          // Check if event already exists and get its favorite status
          const existingEvent = await this.isFavorite(event.id);
          
          const insertQuery = `
            INSERT OR REPLACE INTO events 
            (id, title, category, starts_at, city, price, thumbnail, is_favorite, cached_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          
          await tx.executeSql(insertQuery, [
            event.id,
            event.title,
            event.category,
            event.startsAt,
            event.city,
            event.price,
            event.thumbnail,
            existingEvent ? 1 : 0, // Preserve existing favorite status
            Date.now(),
          ]);
        }
      });
    } catch (error) {
      console.error('Error saving events:', error);
      throw error;
    }
  }

  // Save event details to database
  async saveEventDetails(eventDetails: EventDetails): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      // First check if the event already exists and get its favorite status
      const existingEvent = await this.getEventById(eventDetails.id);
      const isFavorite = existingEvent ? await this.isFavorite(eventDetails.id) : false;

      const updateQuery = `
        INSERT OR REPLACE INTO events 
        (id, title, category, starts_at, city, price, thumbnail, 
         description, venue, speakers, capacity, remaining, is_favorite, cached_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await this.db.executeSql(updateQuery, [
        eventDetails.id,
        eventDetails.title,
        eventDetails.category,
        eventDetails.startsAt,
        eventDetails.city,
        eventDetails.price,
        eventDetails.thumbnail,
        eventDetails.description,
        eventDetails.venue,
        JSON.stringify(eventDetails.speakers),
        eventDetails.capacity,
        eventDetails.remaining,
        isFavorite ? 1 : 0, // Preserve existing favorite status
        Date.now(),
      ]);
    } catch (error) {
      console.error('Error saving event details:', error);
      throw error;
    }
  }

  // Toggle favorite status
  async toggleFavorite(eventId: string): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      // First get current status
      const selectQuery = 'SELECT is_favorite FROM events WHERE id = ?';
      const selectResult = await this.db.executeSql(selectQuery, [eventId]);

      if (selectResult[0].rows.length === 0) {
        throw new Error('Event not found');
      }

      const currentStatus = selectResult[0].rows.item(0).is_favorite;
      const newStatus = currentStatus ? 0 : 1;

      // Update status
      const updateQuery = 'UPDATE events SET is_favorite = ? WHERE id = ?';
      await this.db.executeSql(updateQuery, [newStatus, eventId]);

      return newStatus === 1;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }

  // Check if event is favorite
  async isFavorite(eventId: string): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const query = 'SELECT is_favorite FROM events WHERE id = ?';
      const result = await this.db.executeSql(query, [eventId]);

      if (result[0].rows.length === 0) {
        return false;
      }

      return result[0].rows.item(0).is_favorite === 1;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  // Clear old cached data (older than 7 days)
  async clearOldCache(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const query = 'DELETE FROM events WHERE cached_at < ? AND is_favorite = 0';
      await this.db.executeSql(query, [sevenDaysAgo]);
    } catch (error) {
      console.error('Error clearing old cache:', error);
      throw error;
    }
  }

  // Clear all data
  async clearAllData(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      await this.db.executeSql('DELETE FROM events');
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  }
}

export default new SQLiteDatabase();
