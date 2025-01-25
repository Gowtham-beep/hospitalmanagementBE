
# Hospital Management System Backend

This is the backend service for the Hospital Management System built using **NestJS**. It provides APIs for authentication, managing doctors, patients, appointments, and queue management.

## **Technologies Used**

- **NestJS**: Framework for building scalable server-side applications.
- **TypeORM**: ORM for managing database interactions.
- **MySQL**: Database (Aiven MySQL).
- **JWT**: For authentication.
- **TypeScript**: For static typing.
- **Dotenv**: For environment variable management.

---

## **Setup**

### Prerequisites

- **Node.js**: Ensure Node.js (v18 or later) is installed.
- **MySQL**: A MySQL database instance (e.g., Aiven for MySQL).
- **NPM/Yarn**: Package manager for dependencies.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/hospital-management-backend.git
   cd hospital-management-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the environment variables:

   ```env
   DB_HOST=your-database-host
   DB_PORT=your-database-port
   DB_USER=your-database-username
   DB_PASS=your-database-password
   DB_NAME=your-database-name
   JWT_SECRET=your-jwt-secret
   ```

4. Run the application:
   ```bash
   npm run start:dev
   ```

5. API will be available at `http://localhost:3000`.

---

## **API Routes**

### **Authentication Module**

- **POST** `/auth/login`  
  Logs in a user with email and password.  
  **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
  **Response**:
  ```json
  {
    "accessToken": "jwt-token",
    "expiresIn": "3600s"
  }
  ```

- **POST** `/auth/register`  
  Registers a new user.  
  **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### **Doctor Module**

- **GET** `/doctors`  
  Retrieves the list of all doctors.

- **POST** `/doctors`  
  Adds a new doctor.  
  **Request Body**:
  ```json
  {
    "name": "Dr. Jane Doe",
    "specialization": "Cardiology",
    "availability": "Mon-Fri"
  }
  ```

- **PUT** `/doctors/:id`  
  Updates doctor details.

- **DELETE** `/doctors/:id`  
  Deletes a doctor by ID.

---

### **User Module**

- **GET** `/users`  
  Retrieves all registered users.

- **GET** `/users/:id`  
  Retrieves user details by ID.

- **PUT** `/users/:id`  
  Updates user details.

- **DELETE** `/users/:id`  
  Deletes a user by ID.

---

### **Appointment Module**

- **GET** `/appointments`  
  Retrieves all appointments.

- **POST** `/appointments`  
  Books a new appointment.  
  **Request Body**:
  ```json
  {
    "doctorId": "123",
    "patientName": "John Smith",
    "appointmentDate": "2025-01-30",
    "status": "Booked"
  }
  ```

- **PUT** `/appointments/:id`  
  Updates appointment details.

- **DELETE** `/appointments/:id`  
  Cancels an appointment.

---

### **Queue Management Module**

- **GET** `/queue`  
  Retrieves the list of patients in the queue.

- **POST** `/queue`  
  Adds a patient to the queue.  
  **Request Body**:
  ```json
  {
    "patientName": "John Smith",
    "priority": "Normal"
  }
  ```

- **PUT** `/queue/:id`  
  Updates the queue status (e.g., Waiting, With Doctor, Completed).

- **DELETE** `/queue/:id`  
  Removes a patient from the queue.

---

## **Folder Structure**

```
src/
├── auth/                # Authentication module
├── doctor/              # Doctor module
├── user/                # User module
├── appointment/         # Appointment module
├── queue/               # Queue management module
├── common/              # Common utilities and interceptors
├── main.ts              # Application entry point
├── app.module.ts        # Root module
```

---

## **Database**

### Migrations and Synchronization
- To generate a migration:
  ```bash
  npm run typeorm migration:generate -- -n MigrationName
  ```
- To run migrations:
  ```bash
  npm run typeorm migration:run
  ```

---

## **Features**

1. **Authentication**:
   - Login and registration using JWT.

2. **Queue Management**:
   - Add and manage patients in the queue.
   - Update patient statuses (e.g., Waiting, With Doctor, Completed).

3. **Appointment Management**:
   - Book, update, and cancel appointments.

4. **Doctor Management**:
   - Add, update, and remove doctors.
   - Retrieve list of available doctors.

---

## **Development**

- Run in watch mode:
  ```bash
  npm run start:dev
  ```

- Run tests:
  ```bash
  npm run test
  ```

---

## **License**

This project is licensed under the [MIT License](LICENSE).
