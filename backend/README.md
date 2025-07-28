# ContextED Backend

A TypeScript Express.js backend application with Supabase integration and protected routes for the ContextED MEAN stack application.

## Features

- ✅ TypeScript with Express.js
- ✅ Supabase authentication integration
- ✅ Protected routes middleware
- ✅ CORS configured for frontend
- ✅ Security middleware (Helmet)
- ✅ Request logging (Morgan)
- ✅ Error handling middleware
- ✅ Development hot-reload with Nodemon

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:4200

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
```

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to find your project URL and keys
3. Update your `.env` file with the correct values

## Development

### Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001` with hot-reload enabled.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## API Endpoints

### Public Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `GET /api/public` - Public test endpoint

### Authentication Endpoints

- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (protected)

### Protected Endpoints

- `GET /api/protected` - Protected test endpoint
- `GET /api/optional-auth` - Optional auth test endpoint
- `GET /api/items` - Get user items (protected)
- `POST /api/items` - Create user item (protected)

## Authentication

The backend uses Supabase for authentication. To authenticate requests:

1. User signs in through your frontend using Supabase Auth
2. Frontend receives an access token
3. Include the token in API requests: `Authorization: Bearer <token>`

### Example Frontend Integration (Angular)

```typescript
// In your Angular service
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Use token in HTTP requests
const token = data.session?.access_token;
const headers = { Authorization: `Bearer ${token}` };
```

## Project Structure

```
src/
├── config/          # Configuration files
│   ├── index.ts     # Environment config
│   └── supabase.ts  # Supabase client setup
├── middleware/      # Express middleware
│   ├── auth.ts      # Authentication middleware
│   └── errorHandler.ts # Error handling
├── routes/          # API routes
│   ├── auth.ts      # Authentication routes
│   └── api.ts       # Protected API routes
├── types/           # TypeScript type definitions
│   └── index.ts     # Common types
├── utils/           # Utility functions
├── app.ts           # Express app setup
└── index.ts         # Server entry point
```

## Security Features

- **Helmet**: Adds security headers
- **CORS**: Configured for your frontend domain
- **JWT Validation**: All protected routes validate Supabase tokens
- **Request Logging**: All requests are logged in development
- **Error Handling**: Centralized error handling with appropriate status codes

## Adding New Protected Routes

1. Create your route handler:

```typescript
import { authenticateUser } from '../middleware/auth';

router.get('/my-route', authenticateUser, async (req: AuthenticatedRequest, res) => {
  // req.user contains the authenticated user
  // Your route logic here
});
```

2. The `authenticateUser` middleware automatically:
   - Validates the Bearer token
   - Fetches user data from Supabase
   - Adds user to `req.user`
   - Returns 401 if authentication fails

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 3001) |
| `NODE_ENV` | Environment mode | No (default: development) |
| `FRONTEND_URL` | Frontend URL for CORS | No (default: http://localhost:4200) |
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | No |
| `JWT_SECRET` | JWT secret for additional security | No |

## Next Steps

1. Set up your Supabase project and configure the `.env` file
2. Test the API endpoints using tools like Postman or curl
3. Integrate with your Angular frontend
4. Add database tables and extend the API as needed
5. Implement additional features like file uploads, real-time subscriptions, etc.

For questions or issues, please check the Supabase documentation or create an issue in this repository.
