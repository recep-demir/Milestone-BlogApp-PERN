# Capstone Blog API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express.js-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green)
![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

A RESTful API for managing blogs, users, categories, and comments. Built with **Node.js**, **Express**, and **MongoDB**, it supports CRUD operations, likes, comments, and user-based operations.

---

## Table of Contents

* [Features](#features)
* [Technologies Used](#technologies-used)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Scripts](#scripts)
* [API Endpoints](#api-endpoints)
* [API Documentation](#api-documentation)
* [Author](#author)
* [License](#license)

---

## Features

* RESTful API with modular Express Router
* MongoDB with Mongoose schemas and validation
* Blog post creation, update, deletion, and retrieval
* User management (create, list, delete, etc.)
* Category and comment support
* Like/unlike blog posts dynamically
* Environment variable management with `dotenv`
* Swagger & Redoc documentation

---

## Technologies Used

| Package            | Purpose                         |
| ------------------ | ------------------------------- |
| express            | HTTP server & routing           |
| mongoose           | MongoDB ODM                     |
| dotenv             | Environment variable management |
| swagger-ui-express | Swagger UI                      |
| swagger-autogen    | Auto-generate Swagger specs     |
| swagger-jsdoc      | Generate OpenAPI docs           |
| redoc-express      | Redoc documentation             |
| nodemon            | Development auto-reloading      |

---

## Installation

```bash
git clone https://github.com/recep-demir/capstone-blogapi.git
cd capstone-blogapi
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=8000
MONGO_URL=mongodb://127.0.0.1:27017/blogDB
```

---

## Scripts

```bash
npm run dev       # Start development mode (with nodemon)
```

---

## API Endpoints

### Auth

* `POST /auth/login`
* `POST /auth/register`

### Users

* `GET /users`
* `GET /users/:id`
* `DELETE /users/:id`

### Blogs

* `GET /blogs`
* `POST /blogs`
* `GET /blogs/:id`
* `PUT /blogs/:id`
* `DELETE /blogs/:id`

### Categories

* `GET /categories`
* `POST /categories`

### Comments

* `POST /comments`
* `DELETE /comments/:id`

### Likes

* `PATCH /blogs/:id/like`

---

## API Documentation

* **Swagger UI**: [http://localhost:8000/documents/swagger](http://localhost:8000/documents/swagger)
* **Redoc UI**: [http://localhost:8000/documents/redoc](http://localhost:8000/documents/redoc)

---

## Author

**Recep Demir**
📧 [demir.rp@gmail.com](mailto:demir.rp@gmail.com)

---

## License

This project is licensed under the [ISC License](LICENSE).
