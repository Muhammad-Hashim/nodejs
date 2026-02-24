// refactor: Optimize database connection pooling
// Improved connection management and error handling

const { Pool } = require('pg');

class DatabaseConnection {
  constructor(config) {
    this.pool = new Pool({
      ...config,
      max: 20, // Maximum number of connections
      idleTimeoutMillis: 30000, // Close idle connections after 30s
      connectionTimeoutMillis: 2000, // Return error after 2s
    });
  }

  async query(text, params) {
    const start = Date.now();
    try {
      const result = await this.pool.query(text, params);
      const duration = Date.now() - start;
      
      // Log slow queries
      if (duration > 1000) {
        console.warn(`Slow query (${duration}ms): ${text}`);
      }
      
      return result;
    } catch (error) {
      console.error('Database query failed:', error);
      throw error;
    }
  }

  async transaction(callback) {
    const client = await this.pool.connect();
    try {
      await callback(client);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = DatabaseConnection;
