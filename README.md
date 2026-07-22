# 🎬 ReelCosmos

## Movie Management & Recommendation Platform

ReelCosmos is a modern backend SaaS movie platform built with **Spring Boot 3**, **Java 21**, **PostgreSQL**, **Redis**, **Docker**, and **JWT Authentication**.

The platform provides secure authentication, movie management, TMDB API integration, user interactions, caching, and cloud deployment support.

---

# 🌐 Live Demo

Deployed on ArvanCloud:

https://reelcosmos-3f6eae487f-reelcosmos.apps.ir-central1.arvancaas.ir/

---

# 🔗 Repository

GitHub Repository:

https://github.com/aynazhhoseinzadehh-dot/ReelCosmos

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Access Token
- Refresh Token Mechanism
- Spring Security Authentication
- Role Based Authorization (USER / ADMIN)
- BCrypt Password Encryption

---

## 👤 User Management

- User Profile Management
- Update User Information
- User Roles
- Account Management

---

## 🎬 Movie Management

- Browse Movies
- Movie Details
- Movie Search
- TMDB API Integration
- Movie Metadata Synchronization

---

## ⭐ User Interaction

- Movie Rating
- Movie Reviews
- Favorites
- Watchlist
- Watched Movies

---

## ⚡ Performance

- Redis Cache
- Optimized Database Access
- DTO Pattern
- Entity Mapping
- Global Exception Handling

---

## 📚 Documentation

- Swagger / OpenAPI
- REST API Documentation

---

## ☁ Deployment

- Docker Support
- Docker Hub Image
- ArvanCloud Deployment
- PostgreSQL Cloud Database
- Redis Cache Service

---

# 🏗 Architecture

The project follows a layered architecture:

```text
Controller
    |
    ↓
Service
    |
    ↓
Repository
    |
    ↓
Database
```

This architecture improves scalability, maintainability, and separation of responsibilities.

---

# 📂 Package Structure

```text
com.reelcosmos

├── config
├── controller
├── service
├── repository
├── entity
├── dto
├── mapper
├── security
├── exception
├── client
├── scheduler
├── util
└── enums
```

---

# 📦 Package Responsibilities

| Package | Responsibility |
|---|---|
| controller | REST API endpoints |
| service | Business logic layer |
| repository | Database access layer |
| entity | JPA database entities |
| dto | Request and Response models |
| mapper | Entity and DTO conversion |
| security | JWT and Spring Security configuration |
| config | Application configuration |
| exception | Global exception handling |
| client | External API clients (TMDB) |
| scheduler | Scheduled background tasks |
| util | Utility classes |
| enums | Application enumerations |

---

# 🛠 Technology Stack

## Backend

- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- Maven

---

## Database

- PostgreSQL

---

## Cache

- Redis

---

## Authentication

- JWT

---

## External API

- TMDB API

---

## Deployment

- Docker
- Docker Hub
- ArvanCloud Container Service

---

# 🔑 Security

Implemented security features:

- JWT Authentication
- Access Token
- Refresh Token
- BCrypt Password Hashing
- Role Based Access Control
- Protected REST APIs

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/aynazhhoseinzadehh-dot/ReelCosmos.git

cd ReelCosmos
```

---

## Build Project

```bash
mvn clean package
```

---

## Run Application

```bash
java -jar target/reelcosmos.jar
```

---

# 🐳 Docker

## Build Docker Image

```bash
docker build -t reelcosmos .
```

---

## Run Docker Container

```bash
docker run -p 8080:8080 reelcosmos
```

---

# 🌍 Environment Variables

Required environment variables:

```env
DATABASE_URL=PostgreSQL JDBC URL

DATABASE_USERNAME=Database username

DATABASE_PASSWORD=Database password

REDIS_HOST=Redis service host

REDIS_PORT=6379

PORT=8080
```

---

# 📚 API Documentation

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

Available modules:

- Authentication
- Users
- Movies
- Reviews
- Ratings
- Favorites
- Watchlist

---

# 🗄 Database Entities

Main entities:

- User
- Movie
- Review
- Rating
- Favorite
- Watchlist
- WatchedMovie
- RefreshToken

---

# 📡 Main API Modules

## Authentication

- Register
- Login
- Refresh Token

---

## Movies

- Get Movies
- Search Movies
- Movie Details

---

## Users

- Profile Management
- Favorites
- Watchlist
- Watched Movies

---

## Reviews

- Create Review
- Update Review
- Delete Review

---

## Ratings

- Add Rating
- Update Rating

---

# ☁ Cloud Deployment

The application is containerized using Docker and deployed on ArvanCloud.

Deployment architecture:

```text
Spring Boot Application

        |
        |

PostgreSQL Database

        |
        |

Redis Cache
```

---

# 👩‍💻 Author

## Aynaz Hosseinzadeh

GitHub:

https://github.com/aynazhhoseinzadehh-dot

---

# 📄 License

This project was developed for educational and portfolio purposes.
