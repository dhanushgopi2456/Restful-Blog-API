<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" />
</p>

# 📝 RESTful Blog Application API

> A **production-ready**, full-stack RESTful API for a blog application built with **Node.js**, **Express**, **TypeScript**, and **MongoDB** — featuring JWT authentication, Swagger documentation, Docker support, and a React dashboard.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Usage Examples](#-usage-examples)
- [API Documentation (Swagger)](#-api-documentation-swagger)
- [Docker Deployment](#-docker-deployment)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Security Features](#-security-features)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | JWT-based register & login with bcrypt password hashing |
| 📄 **Posts CRUD** | Create, read, update, delete blog posts with pagination |
| 💬 **Comments CRUD** | Full CRUD for comments linked to posts with filtering |
| 🛡️ **Authorization** | Owner-only access for update/delete operations |
| ✅ **Input Validation** | Mongoose schema-level validation with descriptive errors |
| 🚨 **Error Handling** | Centralized error middleware for Mongoose & application errors |
| 🔒 **Security** | Helmet headers, CORS, rate limiting (100 req/10 min) |
| 📊 **Logging** | Morgan HTTP logging + Winston application logger |
| 📖 **API Docs** | Interactive Swagger UI documentation at `/api-docs` |
| 🏥 **Health Check** | `/api/health` endpoint with database connectivity status |
| 🐳 **Docker** | Production-ready Dockerfile included |
| ⚛️ **React Dashboard** | Frontend dashboard showing API status and documentation links |
| 🧪 **Testing** | Jest + Supertest test suite for API endpoints |

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) + bcryptjs
- **Validation**: Mongoose schema validators
- **Logging**: Winston (application) + Morgan (HTTP requests)

### Frontend
- **Library**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)

### DevOps & Tools
- **Containerization**: Docker
- **API Docs**: Swagger UI Express + YAML
- **Testing**: Jest + ts-jest + Supertest
- **Security**: Helmet, CORS, express-rate-limit

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (React Dashboard)                │
│                     Vite Dev Server / Static                │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP Requests
┌───────────────────────────▼─────────────────────────────────┐
│                     Express.js Server                       │
│  ┌─────────┐ ┌────────┐ ┌──────┐ ┌──────────┐ ┌─────────┐  │
│  │ Helmet  │ │  CORS  │ │Morgan│ │Rate Limit│ │Body JSON│  │
│  └────┬────┘ └───┬────┘ └──┬───┘ └────┬─────┘ └────┬────┘  │
│       └──────────┴─────────┴──────────┴─────────────┘       │
│                            │                                │
│  ┌─────────────────────────▼───────────────────────────┐    │
│  │               Route Layer                           │    │
│  │  /api/v1/auth    /api/v1/posts   /api/v1/comments   │    │
│  └─────────────────────────┬───────────────────────────┘    │
│                            │                                │
│  ┌─────────────────────────▼───────────────────────────┐    │
│  │         Middleware Layer (JWT Auth)                  │    │
│  └─────────────────────────┬───────────────────────────┘    │
│                            │                                │
│  ┌─────────────────────────▼───────────────────────────┐    │
│  │             Controller Layer                        │    │
│  │  authController  postController  commentController  │    │
│  └─────────────────────────┬───────────────────────────┘    │
│                            │                                │
│  ┌─────────────────────────▼───────────────────────────┐    │
│  │              Model Layer (Mongoose)                 │    │
│  │       User          Post          Comment           │    │
│  └─────────────────────────┬───────────────────────────┘    │
│                            │                                │
│  ┌─────────────────────────▼───────────────────────────┐    │
│  │           Error Handler Middleware                  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
              ┌─────────────▼─────────────┐
              │     MongoDB Database      │
              │  (Local / Atlas Cloud)    │
              └───────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** instance (local installation or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dhanushgopi2456/Restful-Blog-API.git
   cd Restful-Blog-API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blog-api

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=24h

   # Server
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - 🌐 **Dashboard**: [http://localhost:3000](http://localhost:3000)
   - 📖 **API Docs**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
   - 🏥 **Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/v1/auth/register` | Register a new user | Public |
| `POST` | `/api/v1/auth/login` | Login and get JWT token | Public |

### 📄 Posts

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/v1/posts` | Get all posts (paginated) | Public |
| `GET` | `/api/v1/posts/:id` | Get single post with comments | Public |
| `POST` | `/api/v1/posts` | Create a new post | 🔒 Auth |
| `PUT` | `/api/v1/posts/:id` | Update a post | 🔒 Owner |
| `DELETE` | `/api/v1/posts/:id` | Delete a post | 🔒 Owner |

### 💬 Comments

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/v1/comments?post_id=ID` | Get comments for a post | Public |
| `GET` | `/api/v1/comments/:id` | Get single comment | Public |
| `POST` | `/api/v1/comments` | Add a comment to a post | 🔒 Auth |
| `PUT` | `/api/v1/comments/:id` | Update a comment | 🔒 Owner |
| `DELETE` | `/api/v1/comments/:id` | Delete a comment | 🔒 Owner |

### 🏥 System

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `GET` | `/api/health` | Health check with DB status | Public |

---

## 💡 Usage Examples

### Register a User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create a Post (Authenticated)
```bash
curl -X POST http://localhost:3000/api/v1/posts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "content": "This is the content of my first blog post."
  }'
```

### Get All Posts (with Pagination)
```bash
curl http://localhost:3000/api/v1/posts?page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 10
  },
  "data": [...]
}
```

### Add a Comment
```bash
curl -X POST http://localhost:3000/api/v1/comments \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "post_id": "POST_ID_HERE",
    "content": "Great post!"
  }'
```

---

## 📖 API Documentation (Swagger)

Interactive API documentation is available via **Swagger UI** at:

```
http://localhost:3000/api-docs
```

The documentation is powered by an OpenAPI 3.0 specification defined in `swagger.yaml`, providing:
- Interactive endpoint testing
- Request/response schema definitions
- Authentication flow documentation

---

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t restful-blog-api .

# Run the container
docker run -p 3000:3000 \
  -e MONGODB_URI="your_mongodb_uri" \
  -e JWT_SECRET="your_jwt_secret" \
  -e JWT_EXPIRE="24h" \
  -e NODE_ENV="production" \
  restful-blog-api
```

### Docker Compose (Optional)

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/blog-api
      - JWT_SECRET=your_secret
      - JWT_EXPIRE=24h
      - NODE_ENV=production
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npx jest --watch
```

The project uses **Jest** with **ts-jest** for TypeScript support and **Supertest** for HTTP assertion testing.

---

## 📁 Project Structure

```
Restful-Blog-API/
├── 📄 server.ts                  # Express app entry point & server configuration
├── 📄 package.json               # Dependencies and scripts
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 vite.config.ts             # Vite build configuration
├── 📄 jest.config.js             # Jest test configuration
├── 📄 swagger.yaml               # OpenAPI 3.0 specification
├── 📄 Dockerfile                 # Docker container configuration
├── 📄 index.html                 # React app HTML template
├── 📄 metadata.json              # Project metadata
│
├── 📂 src/
│   ├── 📄 App.tsx                # React dashboard component
│   ├── 📄 main.tsx               # React entry point
│   ├── 📄 index.css              # Global styles (Tailwind CSS)
│   │
│   ├── 📂 config/
│   │   └── 📄 db.ts              # MongoDB connection setup
│   │
│   ├── 📂 models/
│   │   ├── 📄 User.ts            # User schema (bcrypt hashing)
│   │   ├── 📄 Post.ts            # Post schema (virtual comments)
│   │   └── 📄 Comment.ts         # Comment schema
│   │
│   ├── 📂 controllers/
│   │   ├── 📄 authController.ts  # Register & login logic
│   │   ├── 📄 postController.ts  # Posts CRUD with pagination
│   │   └── 📄 commentController.ts # Comments CRUD
│   │
│   ├── 📂 routes/
│   │   ├── 📄 authRoutes.ts      # Auth route definitions
│   │   ├── 📄 postRoutes.ts      # Post route definitions
│   │   └── 📄 commentRoutes.ts   # Comment route definitions
│   │
│   ├── 📂 middlewares/
│   │   ├── 📄 auth.ts            # JWT authentication middleware
│   │   └── 📄 error.ts           # Global error handler
│   │
│   ├── 📂 utils/
│   │   ├── 📄 asyncHandler.ts    # Async/await error wrapper
│   │   └── 📄 logger.ts          # Winston logger configuration
│   │
│   └── 📂 tests/
│       └── 📄 health.test.ts     # Health endpoint test
│
└── 📂 docs/                      # Project documentation
    ├── 📄 API_DOCUMENTATION.md   # Detailed API reference
    ├── 📄 PROJECT_REPORT.md      # Academic project report
    └── 📄 CONTRIBUTING.md        # Contribution guidelines
```

---

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | — |
| `JWT_SECRET` | Secret key for JWT signing | Yes | `secret` |
| `JWT_EXPIRE` | JWT token expiration time | No | `24h` |
| `PORT` | Server port number | No | `3000` |
| `NODE_ENV` | Environment mode | No | `development` |

---

## 🔒 Security Features

| Feature | Implementation | Details |
|---------|---------------|---------|
| **Password Hashing** | bcryptjs (salt rounds: 10) | Passwords never stored in plain text |
| **JWT Authentication** | Bearer token in Authorization header | Configurable expiration time |
| **Helmet** | HTTP security headers | XSS protection, HSTS, content sniffing prevention |
| **CORS** | Cross-Origin Resource Sharing | Enabled for all origins (configurable) |
| **Rate Limiting** | express-rate-limit | 100 requests per 10-minute window |
| **Input Validation** | Mongoose schema validators | Email regex, min/max length constraints |
| **Error Handling** | Centralized error middleware | Handles CastError, duplicate keys, validation errors |
| **Password Selection** | `select: false` on password field | Password excluded from queries by default |

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](docs/CONTRIBUTING.md) for details on the process.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Dhanush Gopi**

- GitHub: [@dhanushgopi2456](https://github.com/dhanushgopi2456)

---

<p align="center">
  Made with ❤️ using Node.js, Express, TypeScript & MongoDB
</p>
