// refactor: Improve service layer architecture
// This file demonstrates a refactor commit
// Refactoring improves code structure without changing functionality

// Before: Monolithic service class
class OldUserService {
  constructor() {
    this.db = null;
    this.cache = null;
  }
  
  // Mixed responsibilities
  async createUser(userData) {
    // Validation logic
    if (!userData.email) throw new Error('Email required');
    
    // Database logic
    const user = await this.db.users.create(userData);
    
    // Cache logic
    await this.cache.set(`user:${user.id}`, user);
    
    // Notification logic
    await this.sendWelcomeEmail(user);
    
    return user;
  }
}

// After: Separated concerns
class UserRepository {
  constructor(db) {
    this.db = db;
  }
  
  async create(userData) {
    return await this.db.users.create(userData);
  }
}

class UserCache {
  constructor(cache) {
    this.cache = cache;
  }
  
  async set(userId, userData) {
    return await this.cache.set(`user:${userId}`, userData);
  }
}

class UserService {
  constructor(repository, cache, emailService) {
    this.repository = repository;
    this.cache = cache;
    this.emailService = emailService;
  }
  
  async createUser(userData) {
    // Validation logic
    if (!userData.email) throw new Error('Email required');
    
    // Database logic
    const user = await this.repository.create(userData);
    
    // Cache logic
    await this.cache.set(user.id, user);
    
    // Notification logic
    await this.emailService.sendWelcomeEmail(user);
    
    return user;
  }
}

module.exports = { UserService, UserRepository, UserCache };
