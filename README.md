Full-Stack Calendar Application

This project is a full-stack calendar application built with a React frontend, Node.js/Express backend, and MongoDB Atlas database.
The application provides a month-view calendar with the ability to create, edit, and delete events. All events are stored persistently in the cloud using MongoDB Atlas.

Features
Calendar
Month view calendar grid

Displays events by date
Create new events for specific days
Edit and delete existing events

Event Management
Title, description, start time, end time

All events stored in a centralized backend

Real-time updates after creating or editing events

Backend API

RESTful API using Express.js

CRUD operations for calendar events

MongoDB Atlas database for cloud storage

Frontend

Built with React and Vite

Modular component-based structure

Clean and responsive UI layout

Deployment Ready

Backend hosted on Render

Frontend hosted on Netlify

Supports environment variables and CORS configuration

Tech Stack
Frontend

React (Vite)

TailwindCSS

JavaScript (ES Modules)

date-fns for date utilities

Backend

Node.js

Express.js

Mongoose

dotenv

CORS

Database

MongoDB Atlas (cloud-hosted)

Backend Setup (server)
2. Install Dependencies
cd server
npm install

3. Add Environment Variables

Create .env:

MONGODB_URI=your_mongodb_atlas_connection_string
PORT=4000

4. Start Backend
npm run dev


Backend will run at:

http://localhost:4000

Frontend Setup (client)
1. Install Dependencies
cd client
npm install

2. Configure API URL

Edit src/api.js:

const API = "http://localhost:4000";

3. Start Frontend
npm run dev


Frontend will run at:

http://localhost:5173

API Endpoints
Get All Events
GET /api/events

Create Event
POST /api/events

Update Event
PUT /api/events/:id

Delete Event
DELETE /api/events/:id
