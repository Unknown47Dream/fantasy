# Authentication & Authorization System

This directory contains the complete authentication and authorization system for the Fantasy Game backend.

## Features

- ✅ **JWT-based Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - Bcrypt for secure password storage
- ✅ **Role-based Authorization** - Three admin roles (SUPER_ADMIN, ADMIN, MODERATOR)
- ✅ **Protected Routes** - Guards for JWT and role-based access control
- ✅ **Cookie-based Token Storage** - Secure HTTP-only cookies on frontend

## Admin Roles

- **SUPER_ADMIN** - Full access, can create new admins
- **ADMIN** - Standard admin access
- **MODERATOR** - Limited admin access

## Project Structure

```
auth/
├── decorators/
│   ├── current-admin.decorator.ts  # Extract admin from request
│   └── roles.decorator.ts          # Define required roles
├── dto/
│   ├── login.dto.ts                # Login validation
│   └── register.dto.ts             # Registration validation
├── guards/
│   ├── jwt-auth.guard.ts           # JWT authentication guard
│   ├── local-auth.guard.ts         # Local strategy guard
│   └── roles.guard.ts              # Role-based authorization guard
├── strategies/
│   ├── jwt.strategy.ts             # JWT token validation
│   └── local.strategy.ts           # Email/password validation
├── auth.controller.ts              # API endpoints
├── auth.service.ts                 # Business logic
└── auth.module.ts                  # Module definition
```

## Environment Variables

Add these to your `.env` file:

```env
# JWT Configuration
JWT_SECRET=your-secret-key-change-this-in-production

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fantasy_db
```

## Setup Instructions

### 1. Run Prisma Migration

```bash
cd backend
npx prisma migrate dev --name add_admin_model
npx prisma generate
```

### 2. Create First Super Admin (Optional Script)

Create a seed script or use the register endpoint with a temporary bypass:

```typescript
// backend/prisma/seed.ts
import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.create({
    data: {
      email: 'admin@fantasy.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('Super admin created:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run the seed:

```bash
npx ts-node prisma/seed.ts
```

## API Endpoints

### Backend (NestJS)

#### POST `/auth/login`

Login with email and password.

**Request:**

```json
{
  "email": "admin@fantasy.com",
  "password": "admin123"
}
```

**Response:**

```json
{
  "admin": {
    "id": "...",
    "email": "admin@fantasy.com",
    "role": "SUPER_ADMIN",
    "isActive": true
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/auth/register`

Create a new admin (requires SUPER_ADMIN role).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

**Request:**

```json
{
  "email": "newadmin@fantasy.com",
  "password": "password123",
  "role": "ADMIN"
}
```

#### GET `/auth/me`

Get current admin info (requires JWT token).

**Headers:**

```
Authorization: Bearer <jwt_token>
```

### Frontend (Next.js API Routes)

#### POST `/api/auth/admin/login`

Proxy login request and set HTTP-only cookie.

**Request:**

```json
{
  "email": "admin@fantasy.com",
  "password": "admin123"
}
```

**Response:**

```json
{
  "success": true,
  "admin": {
    "id": "...",
    "email": "admin@fantasy.com",
    "role": "SUPER_ADMIN"
  }
}
```

#### POST `/api/auth/admin/register`

Proxy register request (requires authenticated cookie).

#### POST `/api/auth/admin/logout`

Clear authentication cookie.

#### GET `/api/auth/admin/me`

Get current admin using cookie.

## Usage Examples

### Protecting Routes in NestJS

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { CurrentAdmin } from './auth/decorators/current-admin.decorator';
import { AdminRole } from './auth/dto';

@Controller('admin')
export class AdminController {
  // Require authentication
  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  getDashboard(@CurrentAdmin() admin: any) {
    return { admin };
  }

  // Require specific role
  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.SUPER_ADMIN, AdminRole.ADMIN)
  getUsers() {
    return { users: [] };
  }
}
```

### Frontend Login Example

```typescript
// In your login component
async function handleLogin(email: string, password: string) {
  const response = await fetch('/api/auth/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Logged in:', data.admin);
    // Cookie is automatically set by the API route
    router.push('/admin/dashboard');
  }
}
```

### Making Authenticated Requests from Frontend

```typescript
// The cookie is automatically sent with requests to your Next.js API routes
async function getAdminData() {
  const response = await fetch('/api/auth/admin/me');

  if (response.ok) {
    const admin = await response.json();
    return admin;
  }

  // Redirect to login if unauthorized
  router.push('/login');
}
```

## Security Features

1. **Password Hashing** - All passwords are hashed with bcrypt (10 rounds)
2. **JWT Expiration** - Tokens expire after 7 days
3. **HTTP-only Cookies** - Tokens stored in HTTP-only cookies (not accessible via JavaScript)
4. **Secure Cookies** - Cookies use `secure` flag in production
5. **Role-based Access** - Fine-grained permission control
6. **Active Status Check** - Inactive admins cannot login

## Testing

### Test the backend directly:

```bash
# Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fantasy.com","password":"admin123"}'

# Get current admin (replace TOKEN with the access_token from login)
curl -X GET http://localhost:3001/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Test through Next.js:

```bash
# Login (will set cookie)
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@fantasy.com","password":"admin123"}' \
  -c cookies.txt

# Get admin info (uses cookie)
curl -X GET http://localhost:3000/api/auth/admin/me \
  -b cookies.txt
```

## Troubleshooting

### JWT_SECRET not set

Make sure to set `JWT_SECRET` in your `.env` file. Never use the default secret in production.

### CORS Issues

Ensure your NestJS backend has CORS properly configured:

```typescript
// main.ts
app.enableCors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
});
```

### Cookie not being set

- Check that the backend URL is correct in frontend `.env`
- Verify the response includes the token
- Check browser console for errors

## Future Enhancements

- [ ] Add refresh token mechanism
- [ ] Add email verification
- [ ] Add password reset functionality
- [ ] Add two-factor authentication (2FA)
- [ ] Add admin activity logging
- [ ] Add rate limiting for login attempts
