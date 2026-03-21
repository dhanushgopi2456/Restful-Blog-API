# RESTful Blog Application API

A production-ready RESTful API for a blog application built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based authentication (Register, Login).
- **Posts**: CRUD operations for blog posts.
- **Comments**: CRUD operations for comments on posts.
- **Authorization**: Only owners can update or delete their posts/comments.
- **Validation**: Input validation using Mongoose schemas.
- **Error Handling**: Centralized error handling middleware.
- **Security**: Helmet for headers, CORS, and Rate Limiting.
- **Logging**: Morgan for request logging and Winston for application logging.
- **Documentation**: Swagger UI for API documentation.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JSON Web Tokens (JWT), bcryptjs
- **Documentation**: Swagger UI, YAML

## Getting Started

### Prerequisites

- Node.js installed.
- MongoDB instance (local or Atlas).

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env` (see `.env.example`):
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=24h
   ```

### Running the Server

- **Development**:
  ```bash
  npm run dev
  ```

### API Documentation

Once the server is running, visit:
`http://localhost:3000/api-docs`

## API Endpoints

### Auth
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### Posts
- `GET /api/v1/posts` - Get all posts (with pagination)
- `GET /api/v1/posts/:id` - Get single post
- `POST /api/v1/posts` - Create new post (Auth required)
- `PUT /api/v1/posts/:id` - Update post (Auth required, Owner only)
- `DELETE /api/v1/posts/:id` - Delete post (Auth required, Owner only)

### Comments
- `GET /api/v1/comments?post_id=ID` - Get comments for a post
- `GET /api/v1/comments/:id` - Get single comment
- `POST /api/v1/comments` - Add comment (Auth required)
- `PUT /api/v1/comments/:id` - Update comment (Auth required, Owner only)
- `DELETE /api/v1/comments/:id` - Delete comment (Auth required, Owner only)

## Usage Examples

### Register a User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "johndoe", "email": "john@example.com", "password": "password123"}'
```

### Login and Get Token
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Create a Post (Requires Token)
```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title": "My First Post", "content": "This is the content of my first post."}'
```
