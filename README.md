BookMyBite

A restaurant reservation and review platform for restaurants in Chennai and Coimbatore. Users can browse restaurants, book a table with online payment, and leave reviews. Restaurant owners and admins each get their own dashboard to manage things.

This is a monorepo: `frontend/` (React + Vite) and `backend/` (Node + Express) are separate apps that run side by side.

Live Demo

Frontend: `<add deployed frontend URL here>`
Backend API: `<add deployed backend URL here>`

What's in the project

Public pages: home, restaurant listings, restaurant details, about, contact
Login, register, forgot password, reset password
Customer dashboard: reservations, favorites, reviews, profile, notifications
Table booking with online payment through Razorpay
Owner dashboard: manage restaurant, menu, reservations, reviews, revenue
Admin dashboard: manage users, restaurants, reservations, reviews, payments, analytics
Separate login access for customers, owners, and admins

Tech stack

Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion
Backend: Node.js, Express, MongoDB Atlas, JWT authentication, Razorpay

Frontend packages: `react-router-dom` for navigation, `axios` for calling the backend API, `react-hook-form` for forms, `react-hot-toast` for notifications, `react-datepicker` for reservation dates, `react-icons` for icons, `framer-motion` for animations, `tailwindcss` for styling.

Backend packages: `express` for the server, `mongoose` for MongoDB, `jsonwebtoken` for login sessions, `bcryptjs` for hashing passwords, `razorpay` for payments, `multer` for file uploads (restaurant photos), `cors` so the frontend can call the backend, `dotenv` for environment variables, `nodemon` for auto-restarting the server in development.

Getting started

This project has two parts, so you'll need two terminals open at the same time.

Backend

```
cd backend
npm install
```

Create a `.env` file in `backend/` (copy `backend/.env.example`) and fill in:

`PORT` - port the API server runs on (default `5000`)
`MONGO_URI` - MongoDB Atlas (or local) connection string
`JWT_SECRET` - long random string used to sign login tokens
`JWT_EXPIRES_IN` - login token lifetime, e.g. `7d`
`CLIENT_URL` - URL of the running frontend, for CORS (default `http://localhost:5173`)
`RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` - Razorpay API keys (get test keys at https://dashboard.razorpay.com/app/keys)

Then:

```
npm run dev      # starts the server on PORT, restarts on changes
npm run seed      # optional: fills the database with sample restaurants, users, and reservations
```

Frontend

```
cd frontend
npm install
npm run dev      # starts the site on http://localhost:5173
```

The frontend talks to the backend at `/api` by default; set `VITE_API_BASE_URL` in a `frontend/.env` file if the backend isn't running at the default location.

Once both are running, open `http://localhost:5173` in the browser. To stop either one, close its terminal or press Ctrl+C.

Other commands

Frontend: `npm run build` builds for production (outputs to `frontend/dist`), `npm run preview` previews the production build.
Backend: `npm start` runs the production server.

Current status

Signup, login, browsing, booking with payment, reviews, and all three dashboards work end to end. Razorpay is running in test mode - no real payments are processed.
