# 📖 API Documentation — RESTful Blog Application

> Complete API reference for all endpoints with request/response schemas, authentication, error codes, and pagination details.

---

## Base URL

```
http://localhost:3000/api/v1
```

## Interactive Documentation

Swagger UI is available at: `http://localhost:3000/api-docs`

---

## Authentication

The API uses **JWT (JSON Web Token)** bearer authentication.

### How to Authenticate

1. Register or login to receive a JWT token.
2. Include the token in the `Authorization` header of subsequent requests:

```
Authorization: Bearer <your_jwt_token>
```

Token expiration is configurable via the `JWT_EXPIRE` environment variable (default: 24 hours).

---

## Response Format

All responses follow a consistent JSON structure:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Success Response (with Pagination)
```json
{
  "success": true,
  "count": 10,
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10
  },
  "data": [ ... ]
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

---

## Error Codes

| HTTP Code | Meaning | Common Causes |
|-----------|---------|---------------|
| `200` | OK | Successful GET, PUT, DELETE |
| `201` | Created | Successful POST (register, create post/comment) |
| `400` | Bad Request | Validation error, duplicate key, missing fields |
| `401` | Unauthorized | Missing/invalid token, not owner of resource |
| `404` | Not Found | Resource not found, invalid ObjectId |
| `429` | Too Many Requests | Rate limit exceeded (100 requests per 10 minutes) |
| `500` | Server Error | Internal server error |

---

## Endpoints

---

### 1. Authentication

#### POST `/auth/register`

Register a new user account.

**Access:** Public

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
| Field | Type | Rules |
|-------|------|-------|
| `username` | String | Required, unique, min 3 characters, trimmed |
| `email` | String | Required, unique, valid email format |
| `password` | String | Required, min 6 characters (stored as bcrypt hash) |

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` — Duplicate username or email (`"Duplicate field value entered"`)
- `400` — Validation error (e.g., `"Username must be at least 3 characters"`)

---

#### POST `/auth/login`

Login with existing credentials.

**Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400` — `"Please provide an email and password"`
- `401` — `"Invalid credentials"` (wrong email or password)

---

### 2. Posts

#### GET `/posts`

Retrieve all blog posts with pagination.

**Access:** Public

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | Number | `1` | Page number |
| `limit` | Number | `10` | Items per page |

**Example Request:**
```
GET /api/v1/posts?page=2&limit=5
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 5,
  "pagination": {
    "total": 23,
    "page": 2,
    "limit": 5
  },
  "data": [
    {
      "_id": "64a...",
      "title": "My Blog Post",
      "content": "Post content here...",
      "author": {
        "_id": "64a...",
        "username": "johndoe"
      },
      "createdAt": "2026-03-21T10:00:00.000Z",
      "updatedAt": "2026-03-21T10:00:00.000Z"
    }
  ]
}
```

---

#### GET `/posts/:id`

Retrieve a single post by ID, including populated comments.

**Access:** Public

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | String | MongoDB ObjectId of the post |

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64a...",
    "title": "My Blog Post",
    "content": "Full post content...",
    "author": {
      "_id": "64a...",
      "username": "johndoe"
    },
    "comments": [
      {
        "_id": "64b...",
        "content": "Great post!",
        "author": {
          "_id": "64c...",
          "username": "janedoe"
        },
        "createdAt": "2026-03-21T11:00:00.000Z"
      }
    ],
    "createdAt": "2026-03-21T10:00:00.000Z",
    "updatedAt": "2026-03-21T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `404` — `"Post not found"` or invalid ObjectId

---

#### POST `/posts`

Create a new blog post.

**Access:** 🔒 Authenticated users

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "My New Blog Post",
  "content": "This is the content of my blog post."
}
```

**Validation Rules:**
| Field | Type | Rules |
|-------|------|-------|
| `title` | String | Required, trimmed, max 100 characters |
| `content` | String | Required |

> **Note:** The `author` field is automatically set from the authenticated user's ID.

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "64a...",
    "title": "My New Blog Post",
    "content": "This is the content of my blog post.",
    "author": "64a...",
    "createdAt": "2026-03-21T10:00:00.000Z"
  }
}
```

---

#### PUT `/posts/:id`

Update an existing post. Only the post owner can update.

**Access:** 🔒 Owner only

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

**Error Responses:**
- `401` — `"Not authorized to update this post"` (not the owner)
- `404` — `"Post not found"`

---

#### DELETE `/posts/:id`

Delete a post. Only the post owner can delete.

**Access:** 🔒 Owner only

**Success Response (200):**
```json
{
  "success": true,
  "data": {}
}
```

**Error Responses:**
- `401` — `"Not authorized to delete this post"`
- `404` — `"Post not found"`

---

### 3. Comments

#### GET `/comments?post_id=ID`

Get all comments for a specific post.

**Access:** Public

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `post_id` | String | Yes | MongoDB ObjectId of the post |

**Success Response (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "64b...",
      "content": "Great post!",
      "post": "64a...",
      "author": {
        "_id": "64c...",
        "username": "janedoe"
      },
      "createdAt": "2026-03-21T11:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `400` — `"Please provide a post_id"`

---

#### GET `/comments/:id`

Get a single comment by ID.

**Access:** Public

**Error Responses:**
- `404` — `"Comment not found"`

---

#### POST `/comments`

Add a comment to a post.

**Access:** 🔒 Authenticated users

**Request Body:**
```json
{
  "post_id": "64a...",
  "content": "This is a great article!"
}
```

**Validation Rules:**
| Field | Type | Rules |
|-------|------|-------|
| `post_id` | String | Required, must reference an existing post |
| `content` | String | Required, max 500 characters |

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "64b...",
    "content": "This is a great article!",
    "post": "64a...",
    "author": "64c...",
    "createdAt": "2026-03-21T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` — `"Please provide a post_id"`
- `404` — `"Post not found"`

---

#### PUT `/comments/:id`

Update a comment. Only the comment owner can update.

**Access:** 🔒 Owner only

**Request Body:**
```json
{
  "content": "Updated comment text"
}
```

**Error Responses:**
- `401` — `"Not authorized to update this comment"`
- `404` — `"Comment not found"`

---

#### DELETE `/comments/:id`

Delete a comment. Only the comment owner can delete.

**Access:** 🔒 Owner only

**Success Response (200):**
```json
{
  "success": true,
  "data": {}
}
```

**Error Responses:**
- `401` — `"Not authorized to delete this comment"`
- `404` — `"Comment not found"`

---

### 4. Health Check

#### GET `/api/health`

> **Note:** This endpoint is at `/api/health`, not under the `/api/v1` prefix.

**Access:** Public

**Success Response (200):**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-03-21T10:00:00.000Z"
}
```

---

## Data Models

### User
```json
{
  "_id": "ObjectId",
  "username": "String (unique, min 3 chars)",
  "email": "String (unique, valid email)",
  "password": "String (bcrypt hashed, min 6 chars, select: false)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Post
```json
{
  "_id": "ObjectId",
  "title": "String (required, max 100 chars)",
  "content": "String (required)",
  "author": "ObjectId (ref: User)",
  "comments": "Virtual (ref: Comment)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Comment
```json
{
  "_id": "ObjectId",
  "content": "String (required, max 500 chars)",
  "post": "ObjectId (ref: Post)",
  "author": "ObjectId (ref: User)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## Rate Limiting

- **Window**: 10 minutes
- **Max Requests**: 100 per window per IP
- **Response on Exceeded**: `429 Too Many Requests`

---

## CORS Configuration

CORS is enabled for all origins by default. To restrict origins in production, modify the `cors()` configuration in `server.ts`.
