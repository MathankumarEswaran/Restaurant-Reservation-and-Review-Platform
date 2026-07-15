# Chennai Traditions Reserved

A restaurant reservation and review platform for restaurants in Chennai and Coimbatore. Users can browse restaurants, book a table with online payment, and leave reviews. Restaurant owners and admins each get their own dashboard to manage things.

## What's in the project

- Public pages: home, restaurant listings, restaurant details, about, contact
- Login, register, forgot password, reset password
- Customer dashboard: reservations, favorites, reviews, profile, notifications
- Table booking with online payment through Razorpay
- Owner dashboard: manage restaurant, menu, reservations, reviews, revenue
- Admin dashboard: manage users, restaurants, reservations, reviews, payments, analytics
- Separate login access for customers, owners, and admins

## Tech used

Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion
Backend: Node.js, Express, MongoDB Atlas, JWT authentication, Razorpay

## Main packages

Frontend packages: react, react-dom, react-router-dom for navigation, axios for calling the backend API, react-hook-form for form handling, react-hot-toast for notifications, react-datepicker for picking reservation dates, react-icons for icons, framer-motion for animations, and tailwindcss for styling.

Backend packages: express for the server, mongoose for talking to MongoDB, jsonwebtoken for login sessions, bcryptjs for hashing passwords, razorpay for payments, multer for file uploads like restaurant photos, cors so the frontend is allowed to call the backend, dotenv for reading the environment file, and nodemon for auto restarting the server while developing.

## Commands

Frontend, inside the frontend folder:
- npm install, installs all the packages, only needed once or when packages change
- npm run dev, starts the site for development on port 5173
- npm run build, builds the production ready version into a dist folder
- npm run preview, lets me preview that built dist folder locally before deploying it

Backend, inside the backend folder:
- npm install, installs all the packages, only needed once or when packages change
- npm run dev, starts the server for development on port 5000, restarts itself on changes
- npm start, starts the server the normal way, this is the one used in production
- npm run seed, fills the database with sample data for testing

## How to run the project

This project has two parts, frontend and backend, so I need two terminals open at the same time.

Backend, first terminal:
Open the backend folder, install the dependencies once with npm install, then start it with npm run dev. This runs the server on port 5000 and connects it to the MongoDB database.

Frontend, second terminal:
Open the frontend folder, install the dependencies once with npm install, then start it with npm run dev. This runs the site on port 5173.

Once both are running, open localhost:5173 in the browser to use the app. The frontend automatically talks to the backend, no extra setup needed.

If the database is empty, go into the backend folder and run npm run seed once. This fills it with sample restaurants, users, and reservations for testing.

To stop either one, just close that terminal or press Ctrl+C.

## Steps for deployment

Step 1: Set up the environment variables on the hosting platform for the backend. These are PORT, MONGO_URI (the MongoDB Atlas connection string), JWT_SECRET, JWT_EXPIRES_IN, CLIENT_URL (the live frontend URL, not localhost), RAZORPAY_KEY_ID, and RAZORPAY_KEY_SECRET. The Razorpay keys should be switched from test keys to live keys before accepting real payments.

Step 2: Deploy the backend first, on a Node hosting service. Install dependencies with npm install, then start the server with npm start, which runs it in production mode without nodemon. Once deployed, note down the live backend URL.

Step 3: Update the frontend so it points to the live backend URL instead of localhost, then build the frontend for production by running npm run build inside the frontend folder. This creates a dist folder with the optimized, production-ready site.

Step 4: Deploy the contents of the dist folder to a static hosting service. Most hosting services build and deploy automatically once connected to the project.

Step 5: Update CLIENT_URL in the backend environment variables to match the live frontend URL, so login and CORS keep working correctly after deployment.

Step 6: Open the live frontend URL and test signup, login, browsing, booking with payment, and both dashboards to confirm everything works the same as it did locally.

## Current status

Everything works end to end: signup, login, browsing, booking with payment, reviews, and both dashboards. Razorpay is still using test mode keys, not live keys, so no real payments happen yet.
