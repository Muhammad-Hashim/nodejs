// feat: Add comprehensive user management service
// Implements user CRUD operations with validation

class UserService {
  constructor(database) {
    this.db = database;
  }

  async createUser(userData) {
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }
    
    const user = await this.db.users.create({
      ...userData,
      createdAt: new Date(),
      isActive: true
    });
    
    return user;
  }

  async getUserById(userId) {
    return await this.db.users.findById(userId);
  }

  async updateUser(userId, updates) {
    return await this.db.users.update(userId, {
      ...updates,
      updatedAt: new Date()
    });
  }

  async deleteUser(userId) {
    return await this.db.users.delete(userId);
  }

  async getAllUsers() {
    return await this.db.users.find({ isActive: true });
  }
}

module.exports = UserService;
