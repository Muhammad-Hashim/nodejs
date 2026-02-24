// feat: Add new authentication system
// This file demonstrates a feature commit
// Features add new functionality and trigger a minor version bump

const auth = {
  login: (username, password) => {
    // Login implementation
    console.log(`User ${username} logged in`);
  },
  
  logout: () => {
    // Logout implementation
    console.log('User logged out');
  },
  
  register: (userData) => {
    // Registration implementation
    console.log('User registered:', userData);
  }
};

module.exports = auth;
