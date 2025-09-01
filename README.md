# Subscription Management App

A web application to manage subscriptions, track renewal dates, and costs. Users can view their subscriptions, and Admins can manage all subscriptions and users.

---

## Features Implemented

### 1. Authentication
- **Login & Logout** functionality.
- JWT token-based authentication.
- Role-based access control (User / Admin).

### 2. User Dashboard
- Each user sees **only their subscriptions**.
- Display subscription details in **cards**:
  - Service Name
  - Cost and Billing Cycle
  - Renewal Date
  - Notes
  - Shared status
  - Username (for reference)
- Grid layout for professional, mobile-responsive UI.
- Users can **add** and **delete** their subscriptions.
- Logout functionality in the Navbar.

### 3. Admin Dashboard
- Admin can see **all subscriptions** across users.
- Subscriptions displayed in **grid cards** with professional UI.
- Admin can:
  - Add subscriptions
  - Delete subscriptions
  - Toggle shared status of subscriptions
- Display username associated with each subscription.
- Logout functionality in the Navbar.

### 4. Backend Improvements
- **Subscriptions route** updated:
  - Regular users see only their subscriptions.
  - Admins see all subscriptions with user info (`name` & `email`).
- Error handling:
  - Proper HTTP status codes for unauthorized access.
  - Catch and return server errors.
- JWT validation with middleware to secure routes.

### 5. UI Enhancements
- Subscription cards with shadow, hover effects, and rounded corners.
- Responsive grid layout (`1-3 columns` depending on screen size).
- Clear error messages displayed to the user.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** Tailwind CSS for responsive and professional UI

---

## Next Steps (Planned)
- Admin User Management Panel:
  - Create, edit, delete users.
  - Assign roles (Admin / User)
- AI-powered subscription insights for Admin.
- Further UI improvements for analytics and usage optimization.

---

## How to Run

1. Clone the repository.
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
Install frontend dependencies:

bash
Copy code
cd frontend
npm install
Add .env in the backend with:

ini
Copy code
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
Run backend server:

bash
Copy code
npm run dev
Run frontend:

bash
Copy code
npm start
