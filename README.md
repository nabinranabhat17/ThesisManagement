# Thesis Management System

A comprehensive web application for managing university thesis projects. This system allows tracking of students, supervisors, departments, and theses.

## Features

- Public view of completed theses with advanced filtering options
- Admin dashboard for managing all system entities
- Department, supervisor, and student management
- Secure authentication system for administrators

## Project Structure

The project consists of two main parts:

### Backend (Node.js + Express + MySQL)

- RESTful API for data operations
- JWT authentication for secure admin access
- MySQL database for data storage

### Frontend (React + TypeScript + Styled Components)

- Modern, responsive UI built with React
- Type-safe code with TypeScript
- Clean styling with Styled Components
- Admin dashboard with CRUD operations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/nabinranabhat17/ThesisManagement.git
   cd thesis-management-system
   ```

2. Set up the backend

   ```bash
   cd backend
   npm install
   # Create a .env file with your configuration (see .env.example)
   npm run dev
   ```

3. Set up the frontend

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Initialize the database
   ```bash
   # Run the schema.sql script in your MySQL client
   ```

## Default Admin User

- Username: admin
- Password: admin123

**Note**: Change these credentials in production!

## License

[MIT](LICENSE)

````

## Step 3: Create a package.json in the root directory

```json
// filepath: c:\Users\User\Desktop\ThesisManagement\package.json
{
  "name": "thesis-management-system",
  "version": "1.0.0",
  "description": "A comprehensive web application for managing university thesis projects",
  "main": "index.js",
  "scripts": {
    "start": "npm run start:backend & npm run start:frontend",
    "start:backend": "cd backend && npm start",
    "start:frontend": "cd frontend && npm start",
    "dev": "npm run dev:backend & npm run dev:frontend",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "install:all": "npm install && cd backend && npm install && cd ../frontend && npm install"
  },
  "keywords": [
    "thesis",
    "management",
    "university",
    "educational"
  ],
  "author": "",
  "license": "MIT",
  "engines": {
    "node": ">=14.0.0"
  }
}
````

## Step 4: Create a LICENSE file
