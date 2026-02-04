# Changelog

## 1.2.0

### Minor Changes

- 2c22417: Suppress Notifications – Users can mute notification sounds and message bubbles for Disjoint bot messages.
  Edit Channel Configuration – Admins can update channel settings without reinstalling the bot.

## 1.1.0

### Minor Changes

- 0d04b08: 1. **Suppress Notifications** – Users can silence notification sounds and message bubbles for Disjoint bot messages. 2. **Edit Channel Configuration** – Server Admins can update channel settings without needing to re-install the Disjoint activity and bot.

## 1.0.5

### Patch Changes

- 09f6193: Added new utility functions for file operations and improved API endpoints.

## 1.0.4

### Patch Changes

- 09f6193: Added new utility functions for file operations and improved API endpoints.

  ### Changes:

  - Added getignore() function to read .gitignore files
  - Added changeset() function for version management
  - Improved error handling in existing endpoints
  - Updated documentation and comments
  - Added comprehensive test coverage

  ### Technical Details:

  - Enhanced file system operations with better error handling
  - Implemented proper TypeScript types for new functions
  - Added input validation for API parameters
  - Optimized performance for large file processing

  ### Breaking Changes:

  None

  ### Dependencies:

  - Updated @changesets/cli to latest version
  - Added new dev dependencies for testing

## 1.0.3

### Patch Changes

- 3f09dd6: add new thing etc...

## 1.0.2

### Patch Changes

- 3f09dd6: add new thing etc...

## 1.0.1

### Patch Changes

- 3f09dd6: add new thing etc...

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- getignore() function to read .gitignore files
- changeset() function for version management
- GitHub workflow for automated releases
- API endpoints for gitignore and changeset functionality

### Changed

- Updated project structure to support changesets
- Added comprehensive .gitignore file

## [1.0.0] - 2024-02-04

### Added

- Initial Express.js server setup
- 30+ debugging API endpoints with intentional bugs
- TypeScript configuration
- Development and build scripts
