---
"nodejs": patch
---

Added new utility functions for file operations and improved API endpoints.

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
