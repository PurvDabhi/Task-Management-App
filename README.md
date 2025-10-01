# Task-Management-App

🚀 A scalable web application with authentication and dashboard functionality built with React.js and Node.js.

## Project Structure
```
frontend-intern-assignment/
├── frontend/                 # React.js + TypeScript application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state management
│   │   ├── services/       # API service layer
│   │   └── types/          # TypeScript type definitions
│   └── package.json
├── backend/                 # Node.js/Express API
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── server.js
├── postman_collection.json  # API testing collection
├── SCALING.md              # Production scaling strategy
└── README.md
```

## Features
✅ **Authentication & Security**
- JWT-based authentication with bcrypt password hashing
- Protected routes and middleware
- Form validation (client + server side)
- Secure token storage

✅ **Dashboard Functionality**
- User profile management
- CRUD operations on tasks
- Real-time search and filtering
- Responsive design with TailwindCSS

✅ **Technical Implementation**
- React.js with TypeScript
- Node.js/Express backend
- MongoDB database
- RESTful API design
- Error handling and validation

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd frontend-intern-assignment
```

### 2. Backend Setup
```bash
cd backend
npm install

# Start MongoDB (if running locally)
# mongod

# Start the backend server
npm run dev
```
Backend will run on http://localhost:5001

### 3. Frontend Setup
```bash
cd frontend
npm install

# Install TailwindCSS
npx tailwindcss init -p

# Start the frontend application
npm start
```
Frontend will run on http://localhost:3000

### 4. Database Configuration
The project is pre-configured with MongoDB Atlas. Check `backend/.env` for connection details:
```env
PORT=5001
MONGODB_URI=mongodb+srv://[configured]
JWT_SECRET=[configured]
NODE_ENV=development
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Profile Endpoints
- `GET /api/profile` - Get user profile (Protected)
- `PUT /api/profile` - Update user profile (Protected)

### Task Endpoints
- `GET /api/tasks` - Get user tasks with optional filters (Protected)
- `POST /api/tasks` - Create new task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

### Query Parameters for Tasks
- `search` - Search in title and description
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)

## Testing

### Automated Testing
Run the included test script:
```bash
node generate_logs.js
```

### Manual Testing with Postman
1. Import `postman_collection.json` into Postman
2. Register a new user or login
3. Copy the JWT token from the response
4. Set the `token` variable in Postman environment
5. Test all protected endpoints

### Log Files
Application generates comprehensive logs:
- `backend_application.log` - Server and API logs
- `test_logs.txt` - Automated API testing results

## Security Features
- Password hashing with bcryptjs (12 rounds)
- JWT tokens with 7-day expiration
- Input validation and sanitization
- Protected routes with authentication middleware
- CORS configuration
- Error handling without sensitive data exposure

## Production Scaling
See [SCALING.md](./SCALING.md) for detailed production deployment and scaling strategies including:
- Docker containerization
- Database optimization
- Caching strategies
- Load balancing
- Monitoring and alerting
- Cost optimization

## Technology Stack
**Frontend:**
- React.js 18 with TypeScript
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- Context API for state management

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation

## Assignment Compliance ✅

**Frontend Requirements:**
- ✅ React.js with TypeScript
- ✅ Responsive design with TailwindCSS
- ✅ Form validation (client + server)
- ✅ Protected routes with authentication

**Backend Requirements:**
- ✅ Node.js/Express lightweight backend
- ✅ JWT-based authentication APIs
- ✅ Profile fetching/updating endpoints
- ✅ CRUD operations on tasks entity
- ✅ MongoDB database integration

**Dashboard Features:**
- ✅ User profile display
- ✅ Task CRUD operations
- ✅ Search and filter functionality
- ✅ Secure logout flow

**Security & Scalability:**
- ✅ bcrypt password hashing
- ✅ JWT authentication middleware
- ✅ Comprehensive error handling
- ✅ Modular code structure for scaling

## Production Scaling Strategy

**Frontend Scaling:**
- CDN deployment for static assets
- Code splitting and lazy loading
- Service worker for offline functionality
- Performance monitoring with Web Vitals

**Backend Scaling:**
- Horizontal scaling with load balancers
- Database indexing and query optimization
- Redis caching for session management
- API rate limiting and throttling

**Infrastructure:**
- Docker containerization
- Kubernetes orchestration
- CI/CD pipeline automation
- Monitoring with logging aggregation

## License

This project is licensed under the [MIT License](LICENSE).

See [SCALING.md](./SCALING.md) for detailed implementation.
