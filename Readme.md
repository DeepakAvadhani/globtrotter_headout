# 🧩 Globetrotter Challenge

The Ultimate Travel Guessing Game! Test your knowledge of world destinations with cryptic clues and challenge your friends to beat your score.

## Features

- **Destination Guessing**: Get cryptic clues about famous places and guess the correct destination
- **Fun Facts & Trivia**: Learn interesting information about each destination
- **Challenge System**: Share your score with friends and challenge them to beat it
- **User Profiles**: Track your progress with a personalized score

## Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- React Router (for navigation)

### Backend
- Node.js with Express
- MongoDB (for data storage)
- JWT (for authentication)

### Deployment
- Vercel (frontend)
- Railway (backend)

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas account)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/globetrotter-challenge.git
   cd globetrotter-challenge
   ```

2. Install dependencies for both frontend and backend:
   ```
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   
   **Backend (.env file in server directory)**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   ```

   **Frontend (.env file in client directory)**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Generate the destination dataset:
   ```
   cd server
   npm run generate-data
   ```

5. Start the development servers:
   
   **Backend**
   ```
   cd server
   npm run dev
   ```

   **Frontend**
   ```
   cd client
   npm start
   ```

6. Open your browser and navigate to http://localhost:3000

## Project Structure

```
globetrotter/
├── client/                # Frontend React app
│   ├── public/
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API interaction
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React context
│   │   └── utils/         # Helper functions
└── server/                # Backend Node.js app
    ├── controllers/       # Request handlers
    ├── models/            # Database models
    ├── routes/            # API routes
    ├── services/          # Business logic
    ├── utils/             # Helper functions
    └── data/              # Generated dataset
```

## API Endpoints

### Destinations
- `GET /api/destinations/random` - Get a random destination with clues
- `POST /api/destinations/verify/:id` - Verify the answer and get destination details
- `GET /api/destinations/options/:id` - Get multiple choice options for a destination

### Users
- `POST /api/users` - Create or fetch a user
- `GET /api/users/:id` - Get a user by ID
- `PUT /api/users/:id/score` - Update user's score

### Challenges
- `POST /api/challenges` - Create a new challenge
- `GET /api/challenges/:inviteCode` - Get a challenge by invite code

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set up the environment variables
3. Deploy the client directory

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set up the environment variables
3. Deploy the server directory

## License
This project is licensed under the MIT License.