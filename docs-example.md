<!-- docs: Update API documentation -->
<!-- This file demonstrates a docs commit -->
<!-- Documentation changes don't trigger version bumps -->

# API Documentation

## Authentication Module

### login(username, password)
Authenticates a user with the provided credentials.

**Parameters:**
- `username` (string): User's username
- `password` (string): User's password

**Returns:**
- Promise: Resolves with user data on successful authentication

### logout()
Logs out the current user and clears session data.

**Returns:**
- Promise: Resolves when logout is complete

### register(userData)
Registers a new user account.

**Parameters:**
- `userData` (object): User registration data
  - `username` (string): Desired username
  - `email` (string): User's email address
  - `password` (string): User's password

**Returns:**
- Promise: Resolves with new user data
