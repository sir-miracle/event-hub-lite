import sqliteDatabase from '../database/sqliteDatabase';

class DatabaseInitService {
  private isInitialized = false;

  async initializeDatabase(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Initialize SQLite database
      await sqliteDatabase.initDatabase();
      
      // Clear old cache on app start
      const databaseService = (await import('./databaseService')).default;
      await databaseService.clearOldCache();
      
      this.isInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  async closeDatabase(): Promise<void> {
    try {
      await sqliteDatabase.closeDatabase();
      this.isInitialized = false;
      console.log('Database closed successfully');
    } catch (error) {
      console.error('Failed to close database:', error);
    }
  }
}

export default new DatabaseInitService();
