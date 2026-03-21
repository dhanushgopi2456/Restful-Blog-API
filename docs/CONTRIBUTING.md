# 🤝 Contributing to RESTful Blog Application API

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/Restful-Blog-API.git
   cd Restful-Blog-API
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Development Setup

### Prerequisites
- Node.js v18+
- MongoDB instance (local or Atlas)

### Environment Variables
Create a `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/blog-api-dev
JWT_SECRET=dev_secret_key
JWT_EXPIRE=24h
PORT=3000
NODE_ENV=development
```

### Running Locally
```bash
npm run dev
```

---

## Code Style

- **Language**: TypeScript (strict mode)
- **Formatting**: Consistent indentation (2 spaces)
- **Naming**: camelCase for variables/functions, PascalCase for interfaces/types
- **Imports**: Use `.ts` extensions in import paths
- **Error Handling**: Use the `asyncHandler` wrapper for all async route handlers
- **Documentation**: Add JSDoc-style comments (`@desc`, `@route`, `@access`) to all controller functions

---

## Project Structure

When adding new features, follow the existing structure:

```
src/
├── controllers/    # Business logic
├── models/         # Mongoose schemas
├── routes/         # Express route definitions
├── middlewares/     # Custom middleware
├── utils/          # Shared utilities
├── config/         # Configuration files
└── tests/          # Test files
```

---

## Making Changes

### Adding a New Endpoint

1. **Create or update the Model** in `src/models/`
2. **Create the Controller** in `src/controllers/` using `asyncHandler`
3. **Create the Route** in `src/routes/` with appropriate middleware
4. **Mount the router** in `server.ts`
5. **Update `swagger.yaml`** with the new endpoint documentation
6. **Write tests** in `src/tests/`

### Example Controller Pattern
```typescript
import asyncHandler from '../utils/asyncHandler.ts';

// @desc    Description of what this does
// @route   METHOD /api/v1/resource
// @access  Public/Private
export const myHandler = asyncHandler(async (req, res) => {
  // Implementation
  res.status(200).json({ success: true, data: result });
});
```

---

## Commit Guidelines

Use clear, descriptive commit messages:

```
feat: add user profile endpoint
fix: resolve pagination offset bug
docs: update API documentation
test: add post creation tests
refactor: extract validation middleware
chore: update dependencies
```

---

## Pull Request Process

1. Update documentation if you've changed API behavior
2. Ensure all existing tests pass: `npm test`
3. Add tests for new functionality
4. Update `swagger.yaml` for any new/modified endpoints
5. Fill out the PR template with a description of your changes
6. Request a review from a maintainer

---

## Reporting Issues

When reporting bugs, please include:
- Node.js version
- MongoDB version
- Steps to reproduce
- Expected vs. actual behavior
- Error logs (if applicable)

---

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for helping improve this project! 🎉
