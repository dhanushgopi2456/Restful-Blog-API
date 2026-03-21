# 📋 Project Report — RESTful Blog Application API

---

## 1. Introduction

### 1.1 Project Title
**RESTful Blog Application API**

### 1.2 Project Overview
This project implements a production-ready, full-stack RESTful API for a blog application. It provides a robust backend service for creating, reading, updating, and deleting blog posts and comments, secured with JWT-based authentication and following industry-standard security practices.

### 1.3 Objective
The primary objective of this project is to design and develop a scalable, secure, and well-documented REST API that serves as the backbone for a blog platform. The project demonstrates proficiency in backend development, database design, authentication patterns, API documentation, and modern DevOps practices.

### 1.4 Scope
- User registration and authentication using JWT tokens
- Full CRUD operations for blog posts with pagination
- Full CRUD operations for comments with post-level filtering
- Owner-based authorization for resource modification
- Interactive API documentation using Swagger UI
- React-based dashboard for API health monitoring
- Docker containerization for deployment
- Comprehensive error handling and input validation

---

## 2. Literature Survey

| # | Area | Technology/Pattern | Purpose |
|---|------|-------------------|---------|
| 1 | REST Architecture | Roy Fielding's REST principles | Stateless, resource-based API design |
| 2 | Authentication | JWT (RFC 7519) | Stateless token-based authentication |
| 3 | Password Security | bcrypt hashing algorithm | Secure password storage with salting |
| 4 | API Documentation | OpenAPI 3.0 specification | Standardized API contract description |
| 5 | NoSQL Databases | MongoDB document model | Flexible schema for blog content |
| 6 | ODM Patterns | Mongoose ODM | Schema validation, virtuals, middleware |
| 7 | Security Headers | OWASP security standards | HTTP header hardening with Helmet |
| 8 | Rate Limiting | Token bucket algorithm | DDoS and brute-force mitigation |

---

## 3. System Study & Analysis

### 3.1 Problem Statement
Building a blog platform requires a reliable backend API that handles user management, content creation, and interactions (comments) efficiently. The API must be secure, performant, and developer-friendly with proper documentation.

### 3.2 Existing Solutions Analysis
| Solution | Pros | Cons |
|----------|------|------|
| WordPress REST API | Mature, plugin-rich | PHP-based, heavy, monolithic |
| Strapi (Headless CMS) | Admin panel, flexible | Opinionated structure, overhead |
| Custom Express API | Full control, lightweight | Requires manual setup |

### 3.3 Proposed Solution
A custom-built Express.js API with TypeScript provides full control over the architecture while maintaining type safety. MongoDB offers flexible document storage suitable for blog content of varying structures.

---

## 4. System Design

### 4.1 Architecture Pattern
The application follows a **layered architecture** with clear separation of concerns:

| Layer | Responsibility | Files |
|-------|---------------|-------|
| **Routes** | URL mapping & HTTP method binding | `authRoutes.ts`, `postRoutes.ts`, `commentRoutes.ts` |
| **Middleware** | Authentication, error handling | `auth.ts`, `error.ts` |
| **Controllers** | Business logic & request handling | `authController.ts`, `postController.ts`, `commentController.ts` |
| **Models** | Data schema & database interaction | `User.ts`, `Post.ts`, `Comment.ts` |
| **Utils** | Shared utilities | `asyncHandler.ts`, `logger.ts` |
| **Config** | Database & environment setup | `db.ts` |

### 4.2 Database Schema Design

**User Collection:**
| Field | Type | Constraints |
|-------|------|------------|
| `_id` | ObjectId | Auto-generated |
| `username` | String | Required, unique, min 3 chars |
| `email` | String | Required, unique, regex validated |
| `password` | String | Required, min 6 chars, bcrypt hashed |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |

**Post Collection:**
| Field | Type | Constraints |
|-------|------|------------|
| `_id` | ObjectId | Auto-generated |
| `title` | String | Required, max 100 chars |
| `content` | String | Required |
| `author` | ObjectId | Reference to User |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |

**Comment Collection:**
| Field | Type | Constraints |
|-------|------|------------|
| `_id` | ObjectId | Auto-generated |
| `content` | String | Required, max 500 chars |
| `post` | ObjectId | Reference to Post |
| `author` | ObjectId | Reference to User |
| `createdAt` | Date | Auto-generated |
| `updatedAt` | Date | Auto-generated |

### 4.3 Entity Relationships
```
User (1) ──── (N) Post
User (1) ──── (N) Comment
Post (1) ──── (N) Comment
```

---

## 5. Technologies Used

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Runtime | Node.js | 20+ | Server-side JavaScript execution |
| Framework | Express.js | 4.21 | Web application framework |
| Language | TypeScript | 5.8 | Type-safe JavaScript |
| Database | MongoDB | Latest | NoSQL document database |
| ODM | Mongoose | 9.3 | MongoDB object modeling |
| Auth | jsonwebtoken | 9.0 | JWT token generation & verification |
| Hashing | bcryptjs | 3.0 | Password encryption |
| Security | helmet | 8.1 | HTTP security headers |
| CORS | cors | 2.8 | Cross-origin resource sharing |
| Rate Limit | express-rate-limit | 8.3 | Request throttling |
| Logging | winston | 3.19 | Application logging |
| HTTP Logs | morgan | 1.10 | HTTP request logging |
| API Docs | swagger-ui-express | 5.0 | Interactive API documentation |
| YAML | yamljs | 0.3 | Swagger specification parsing |
| Frontend | React | 19.0 | UI component library |
| Build | Vite | 6.2 | Frontend build tool |
| Styling | Tailwind CSS | 4.1 | Utility-first CSS framework |
| Icons | Lucide React | Latest | UI icons |
| Testing | Jest | 30.3 | Test framework |
| HTTP Test | Supertest | 7.2 | HTTP assertion library |
| Container | Docker | 20+ | Containerization |

---

## 6. Implementation Details

### 6.1 Authentication Flow
1. User submits registration data (username, email, password)
2. Password is hashed using bcrypt with 10 salt rounds via Mongoose pre-save hook
3. User document is created in MongoDB
4. JWT token is generated with user ID payload and configured expiration
5. Token is returned to the client
6. Subsequent authenticated requests include the token in the `Authorization` header
7. The `protect` middleware verifies the token and attaches the user to the request

### 6.2 Post Operations
- **Pagination**: Server-side pagination with configurable `page` and `limit` query parameters
- **Population**: Author username is populated on list views; comments are populated on detail views using Mongoose virtual fields
- **Authorization**: Update and delete operations verify that `post.author === req.user.id`

### 6.3 Comment Operations
- **Filtering**: Comments are queried by `post_id` query parameter
- **Validation**: Post existence is verified before allowing comment creation
- **Authorization**: Same owner-based authorization pattern as posts

### 6.4 Error Handling
Centralized error middleware handles three Mongoose-specific error types:
| Error Type | Example | HTTP Code |
|-----------|---------|-----------|
| `CastError` | Invalid ObjectId format | 404 |
| Duplicate Key (code 11000) | Duplicate email/username | 400 |
| `ValidationError` | Missing required fields | 400 |

### 6.5 Security Implementation
- **Helmet**: Sets security-related HTTP headers (X-Frame-Options, X-XSS-Protection, etc.)
- **CORS**: Allows cross-origin requests (configurable)
- **Rate Limiting**: 100 requests per 10-minute window per IP
- **Password Field Exclusion**: Password field has `select: false`, preventing it from appearing in query results

---

## 7. Testing

### 7.1 Test Framework
- **Jest** with **ts-jest** for TypeScript support
- **Supertest** for HTTP endpoint testing

### 7.2 Test Cases

| # | Test Case | Type | Expected Result | Status |
|---|-----------|------|-----------------|--------|
| 1 | Health endpoint returns 200 | Unit | `{ status: "ok" }` | ✅ Pass |
| 2 | Health endpoint response format | Unit | JSON with status field | ✅ Pass |

### 7.3 Running Tests
```bash
npm test
```

---

## 8. Results & Observations

### 8.1 Functional Results
| Feature | Status | Details |
|---------|--------|---------|
| User Registration | ✅ Working | Passwords hashed, JWT returned |
| User Login | ✅ Working | Credentials validated, JWT returned |
| Create Post | ✅ Working | Author auto-assigned from token |
| Read Posts | ✅ Working | Pagination and population functional |
| Update Post | ✅ Working | Owner authorization enforced |
| Delete Post | ✅ Working | Owner authorization enforced |
| Create Comment | ✅ Working | Post existence validated |
| Read Comments | ✅ Working | Post-based filtering functional |
| Update Comment | ✅ Working | Owner authorization enforced |
| Delete Comment | ✅ Working | Owner authorization enforced |
| Health Check | ✅ Working | Database status reported |
| Swagger Docs | ✅ Working | Interactive UI at `/api-docs` |

### 8.2 Non-Functional Results
| Metric | Target | Achieved |
|--------|--------|----------|
| Rate Limiting | 100 req/10 min | ✅ Configured |
| Security Headers | All OWASP headers | ✅ Via Helmet |
| Password Security | bcrypt hashing | ✅ Salt rounds: 10 |
| API Documentation | OpenAPI 3.0 | ✅ Swagger UI active |
| Containerization | Docker support | ✅ Dockerfile ready |

---

## 9. Advantages & Disadvantages

### Advantages
1. **Type Safety**: TypeScript provides compile-time error detection and better IDE support
2. **Scalable Architecture**: Layered separation allows independent scaling of components
3. **Security-First**: Multiple security layers (Helmet, CORS, rate limiting, bcrypt)
4. **Developer Experience**: Swagger UI enables easy API exploration and testing
5. **Docker Ready**: Single-command deployment with Docker
6. **Comprehensive Error Handling**: Mongoose-specific error types caught and formatted

### Disadvantages
1. **No Email Verification**: Registration doesn't require email confirmation
2. **No Refresh Tokens**: Token expiry requires re-login rather than silent refresh
3. **No Role-Based Access**: Only owner-based authorization (no admin roles)
4. **No File Uploads**: Posts support text-only content
5. **Basic Pagination**: No cursor-based pagination for real-time feeds

---

## 10. Conclusion

The RESTful Blog Application API successfully demonstrates the design and implementation of a production-grade REST API. The project covers essential aspects of modern backend development including secure authentication, data validation, error handling, API documentation, and containerization. The layered architecture ensures maintainability and testability, while the comprehensive security measures make it suitable for production deployment.

---

## 11. Future Scope

1. **Role-Based Access Control (RBAC)**: Implement admin and moderator roles
2. **Refresh Token Rotation**: Add secure refresh token mechanism for better UX
3. **Email Verification**: OTP or link-based email verification on registration
4. **Image Uploads**: Support for post cover images and user avatars via cloud storage
5. **Full-Text Search**: Implement search functionality across posts using MongoDB Atlas Search
6. **WebSocket Notifications**: Real-time comment notifications using Socket.io
7. **Caching Layer**: Add Redis caching for frequently accessed posts
8. **CI/CD Pipeline**: Automated testing and deployment via GitHub Actions
9. **GraphQL API**: Alternative GraphQL endpoint for flexible data querying
10. **Analytics Dashboard**: Post view counts, engagement metrics, and user statistics

---

## 12. References

1. Fielding, R. T. (2000). *Architectural Styles and the Design of Network-based Software Architectures*. Doctoral dissertation, University of California, Irvine.
2. Jones, M., Bradley, J., & Sakimura, N. (2015). *JSON Web Token (JWT)*. RFC 7519.
3. Express.js Documentation — https://expressjs.com/
4. MongoDB Documentation — https://www.mongodb.com/docs/
5. Mongoose ODM Documentation — https://mongoosejs.com/docs/
6. OpenAPI Specification 3.0 — https://spec.openapis.org/oas/v3.0.3
7. TypeScript Documentation — https://www.typescriptlang.org/docs/
8. Docker Documentation — https://docs.docker.com/

---

## Appendix

### A. Source Code Repository
- **GitHub**: https://github.com/dhanushgopi2456/Restful-Blog-API

### B. Key Scripts
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build production frontend |
| `npm test` | Run test suite |
| `npm run lint` | TypeScript type checking |

### C. API Base URLs
- **Local Development**: `http://localhost:3000/api/v1`
- **Swagger UI**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/api/health`
