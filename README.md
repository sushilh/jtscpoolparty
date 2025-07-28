# Event Check-In App

## Overview
A full-stack web app to manage event check-ins with a PostgreSQL backend and a simple frontend UI.

## Features
- View RSVP list
- Check in attendees
- Export list as CSV

## Setup Instructions

### Backend (Node.js)
1. Deploy the backend folder as a Web Service on [https://render.com](https://render.com)
2. Set the environment variable in Render:
   - `DATABASE_URL`: your PostgreSQL internal URL

3. Use the build commands:
   ```
   Build: npm install
   Start: npm start
   ```

### Frontend (Built-in)
The frontend is already built-in and will be served from `/public`.

## Local Development
- Backend:
  ```
  cd backend
  cp .env.example .env
  npm install
  node server.js
  ```



---

Made for RSVP + Check-In tracking 🚀
