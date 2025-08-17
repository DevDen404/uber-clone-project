
# Uber Clone Frontend

This is the frontend for the Uber Clone project, built with React.js and Vite. It provides a modern, responsive user interface for ride booking, live tracking, authentication, and more, communicating with the backend via REST and WebSocket APIs.

## Features
- User and Captain (Driver) authentication
- Ride booking and live tracking
- Location selection and address suggestions (Google Maps API)
- Protected routes for users and captains
- Real-time updates via WebSocket
- Toast notifications and loading indicators

## Tech Stack
- React.js (with Vite)
- Context API for state management
- Custom hooks and Higher-Order Components (HOCs)
- Google Maps API for geolocation and address suggestions
- Socket.io-client for real-time communication

## Folder Structure
```
src/
  components/   # UI panels, loaders, selectors
  context/      # Global state (user, captain, socket)
  HOC/          # Protected route wrappers
  pages/        # User and Captain pages
  assets/       # Images and icons
public/         # Static assets
```

## Getting Started
1. Install dependencies:
	```sh
	npm install
	```
2. Configure environment variables:
	- Copy `.env.local.example` to `.env` and set your API endpoints and Google Maps API key.
3. Start the development server:
	```sh
	npm run dev
	```

## Backend Integration
This frontend communicates with the backend (Node.js/Express) for authentication, ride management, and geolocation. Make sure the backend server is running and accessible at the API URL specified in your `.env` file.

## Useful Links
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Google Maps API](https://developers.google.com/maps/documentation)

## License
This project is for educational purposes and is not affiliated with Uber Technologies Inc.
