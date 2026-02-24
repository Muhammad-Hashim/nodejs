// feat: Redesign authentication API
// BREAKING CHANGE: Authentication endpoints completely changed
// This file demonstrates a breaking change commit
// Breaking changes trigger major version bumps

// OLD API (v1.x) - DEPRECATED
const oldAuthAPI = {
  // Old method - will be removed
  authenticate: (credentials) => {
    // Simple username/password auth
    return { token: 'simple-token', user: credentials.username };
  }
};

// NEW API (v2.x) - CURRENT
const newAuthAPI = {
  // New method - OAuth2 based
  authenticate: async (provider, code) => {
    // OAuth2 authentication flow
    const token = await exchangeCodeForToken(provider, code);
    const userProfile = await getUserProfile(token);
    
    return {
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      user: userProfile,
      expiresAt: token.expires_at
    };
  },
  
  // New method for token refresh
  refreshToken: async (refreshToken) => {
    const newTokens = await refreshAccessToken(refreshToken);
    return newTokens;
  },
  
  // New method for logout
  revokeToken: async (accessToken) => {
    await revokeAccessToken(accessToken);
  }
};

// Helper functions
async function exchangeCodeForToken(provider, code) {
  // OAuth2 code exchange implementation
  return {
    access_token: 'new-access-token',
    refresh_token: 'new-refresh-token',
    expires_at: Date.now() + 3600000
  };
}

async function getUserProfile(token) {
  // Get user profile from OAuth provider
  return {
    id: 'user-123',
    email: 'user@example.com',
    name: 'John Doe'
  };
}

async function refreshAccessToken(refreshToken) {
  // Refresh access token implementation
  return {
    access_token: 'refreshed-access-token',
    expires_at: Date.now() + 3600000
  };
}

async function revokeAccessToken(accessToken) {
  // Revoke token implementation
  console.log('Token revoked:', accessToken);
}

module.exports = { 
  newAuthAPI, 
  oldAuthAPI, // Keep for migration period
  exchangeCodeForToken,
  getUserProfile,
  refreshAccessToken,
  revokeAccessToken
};
