# Uber Clone

A full-stack Uber-like ride-hailing application built for educational and portfolio purposes. This project demonstrates real-time ride booking, driver and user authentication, live tracking, and more, using modern web technologies.

## Project Structure


```
UBER-CLONE/
├── Backend/   # Node.js Express REST API, WebSocket, MongoDB
├── Frontend/  # React.js, Vite, Context API
├── Maps & Geolocation: Google Maps API
└── Readme.md  # Project overview
```

## Features
- User and Captain (Driver) authentication
- Real-time ride booking and tracking (WebSocket)
- Location selection and live updates
- Protected routes for users and captains
- Token-based authentication and blacklisting
- Modular codebase for scalability

## Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (via Mongoose)
- **WebSocket** (socket.io)
- **JWT** for authentication
- Modular MVC structure

### Frontend
- **React.js** (with Vite)
- **Context API** for state management
- **Custom hooks and HOCs** for route protection
- **Modern UI components**

## Folder Overview

### Backend
- `controllers/` — Business logic for users, captains, rides, maps
- `models/` — Mongoose schemas for MongoDB
- `routes/` — Express route definitions
- `services/` — Service layer for business operations
- `middlewares/` — Token authentication, error handling
- `db/` — Database connection
- `socket.js` — Real-time communication setup

### Frontend
- `src/components/` — UI panels, loaders, location selectors
- `src/context/` — Global state for user, captain, socket
- `src/HOC/` — Higher-order components for protected routes
- `src/pages/` — User and Captain pages (login, signup, home)
- `public/` — Static assets

## Getting Started

1. **Clone the repository:**
	```sh
	git clone https://github.com/yourusername/uber-clone.git
	```
2. **Setup Backend:**
	- Navigate to `Backend/`
	- Install dependencies: `npm install`
	- Configure `.env` (see `.env.example`)
	- Start server: `node server.js`
3. **Setup Frontend:**
	- Navigate to `Frontend/`
	- Install dependencies: `npm install`
	- Configure `.env` (see `.env.local.example`)
	- Start dev server: `npm run dev`

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is for educational purposes and is not affiliated with Uber Technologies Inc.
