# Thesis Management System Backend

This is the backend for the Thesis Management System. It provides APIs for managing departments, supervisors, students, and completed theses.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)

### Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Set up the environment variables by creating a `.env` file with the following content (modify as needed):

   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=thesis_management
   JWT_SECRET=your_jwt_secret_key
   ```

5. Set up the database:
   - Create a MySQL database named `thesis_management`
   - Run the schema.sql script to create tables and seed data:
     ```
     mysql -u your_username -p < db/schema.sql
     ```
   - Alternatively, you can run the script in blocks from your MySQL client

### Running the Application

Start the development server:

```
npm run dev
```

The API will be available at `http://localhost:3000`

## Default Admin User

A default admin user is created with the following credentials:

- Username: admin
- Password: admin123

**Important**: Change the default admin password in production.

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login as admin
- `GET /api/auth/profile` - Get admin profile (requires authentication)
- `POST /api/auth/register` - Register a new admin (should be restricted in production)

### Protected Routes

The following routes require admin authentication:

- Adding, updating or deleting departments
- Adding, updating or deleting supervisors
- Adding, updating or deleting students
- Adding, updating or deleting theses

### Departments

- `GET /api/departments` - Get all departments (public)
- `GET /api/departments/:id` - Get department by ID (public)
- `POST /api/departments` - Create new department (admin only)
- `PUT /api/departments/:id` - Update department (admin only)
- `DELETE /api/departments/:id` - Delete department (admin only)

### Supervisors

- `GET /api/supervisors` - Get all supervisors (public)
- `GET /api/supervisors/:id` - Get supervisor by ID (public)
- `GET /api/supervisors/:id/theses` - Get theses supervised by a specific supervisor (public)
- `POST /api/supervisors` - Create new supervisor (admin only)
- `PUT /api/supervisors/:id` - Update supervisor (admin only)
- `DELETE /api/supervisors/:id` - Delete supervisor (admin only)

### Students

- `GET /api/students` - Get all students (public)
- `GET /api/students/:id` - Get student by ID (public)
- `GET /api/students/:id/thesis` - Get thesis belonging to a specific student (public)
- `POST /api/students` - Create new student (admin only)
- `PUT /api/students/:id` - Update student (admin only)
- `DELETE /api/students/:id` - Delete student (admin only)

### Theses

- `GET /api/theses` - Get all theses (public)
- `GET /api/theses/:id` - Get thesis by ID (public)
- `GET /api/theses/supervisor/:supervisorId` - Get theses by supervisor (public)
- `GET /api/theses/student/:studentId` - Get theses by student (public)
- `GET /api/theses/year/:year` - Get theses by submission year (public)
- `GET /api/theses/date-range/:startDate/:endDate` - Get theses by submission date range (public)
- `GET /api/theses/search/:query` - Search theses by title, student name or supervisor name (public)
- `POST /api/theses` - Create new thesis (admin only)
- `PUT /api/theses/:id` - Update thesis (admin only)
- `DELETE /api/theses/:id` - Delete thesis (admin only)

## Authentication

To access protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

The token is obtained by logging in through `/api/auth/login`.
