githubLink:-https://github.com/rashiya795/youtubeClone

Project Overview

This project is the backend for a YouTube clone application. It allows users to register, login, create channels, upload videos, and manage content. The backend is built with Node.js, Express, and MongoDB, and provides a RESTful API that can be consumed by a React frontend.


Features

-->User authentication (register/login) using JWT tokens

-->Create, update, and fetch channels

-->Upload and manage videos

-->Fetch video lists and single video details

-->Secure routes with authentication middleware

-->CORS enabled for frontend integration


Tech Stack

-->Backend: Node.js, Express.js

-->Database: MongoDB, Mongoose

-->Authentication: JSON Web Tokens (JWT)

-->Environment Management: dotenv

-->CORS Handling: cors

Installation

1.Clone the repository:
git clone <your-repo-link>
cd youtube-clone-backend

2.Install dependencies:
npm install

3.Create a .env file in the root directory and add:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

4.Start the server:
npm run dev

The server will run on http://localhost:5000

-->Environment Variables
Variable	Description
PORT	Port number for the backend server
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for JWT authentication
API Routes
Users

POST /api/users/register – Register a new user

POST /api/users/login – Login user and return token

GET /api/users/me – Get current logged-in user

Channels

POST /api/channels – Create a new channel (auth required)

GET /api/channels/me – Get current user’s channel

GET /api/channels/:channelId – Get channel by ID

-->Videos

POST /api/videos – Upload a video (auth required)

GET /api/videos – Fetch all videos

GET /api/videos/:videoId – Fetch video by ID

Note: Protected routes require Authorization header with the JWT token.

-->Usage

Use Postman or Thunder Client to test the API endpoints.

Connect with the frontend at http://localhost:5173.

Include JWT token in requests for protected routes:

Authorization: Bearer <token>

-->Testing

You can test the API using:

Postman

Thunder Client
 (VS Code extension)

Contributing

-->Fork the repository

Create your feature branch: git checkout -b feature/your-feature

Commit your changes: git commit -m 'Add some feature'

Push to the branch: git push origin feature/your-feature

Open a Pull Request