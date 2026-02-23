# AeroNex Copilot Instructions

## Architecture Overview

**AeroNex** is a full-stack monorepo with separate client and server workspaces:

- **Client** (`/client`): Next.js 14+ (App Router) with TypeScript for pilot/farmer dashboard
- **Server** (`/server`): Node.js/Express with MongoDB (Mongoose) backend
- **Monorepo**: Root `package.json` uses workspaces; run `npm run dev` to start both servers

### Key Entities & Domain Logic

- **Users**: Farmers and Pilots with role-based access (`role: 'farmer' | 'pilot' | 'admin'`)
- **Pilot Profile**: License verification (`pilotProfile.isVerified`), credibility scoring (`credibilityScore`), geolocation (`baseLocation` with 2dsphere index)
- **Jobs**: Likely spraying/delivery missions assigned to pilots by farmers (see `/server/models/Job.js`)

### Data Flow

1. **Authentication**: User registers/logs in → Backend generates JWT → Frontend stores token + user in localStorage
2. **Protected Routes**: Frontend `RoleGuard` component checks `user.role`; API calls attach token via Axios interceptors (need to verify if implemented)
3. **API Base URL**: `process.env.NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8000/api` in dev)

---

## Development Workflows

### Local Development

```bash
npm run dev              # Starts both client (3000) and server (5000) concurrently
npm run client          # Next.js frontend only
npm run server          # Express backend only
```

### Database Setup

- Uses MongoDB via Mongoose
- Run `/server/repairDb.js` if needed for schema repairs
- User model: password is hashed with bcryptjs, excluded from queries by default (`.select('-password')`)

---

## Code Patterns & Conventions

### Frontend (Next.js + TypeScript)

1. **"use client" Directive**: Required for all interactive components (context, hooks, state)
   - Example: `AuthContext.tsx`, `RoleGuard.tsx`
2. **Auth Flow**:
   - `useAuth()` hook retrieves user from context
   - Redirect logic: pilots → `/pilot/dashboard`, farmers → `/farmer/dashboard`
3. **API Calls**: Use `api` Axios instance from `utils/api.ts`; **add JWT interceptor if missing**
4. **Route Structure**:
   - `/app/farmer/*` for farmer dashboards
   - `/app/pilot/*` for pilot dashboards
   - Auth pages: `/login`, `/register`

### Backend (Express + Mongoose)

1. **JWT Auth**:
   - Token generated on register/login, expires in 30 days
   - `protect` middleware extracts "Bearer <token>" from headers, decodes with `process.env.JWT_SECRET`
   - Attaches `req.user` (without password) for downstream handlers
2. **Route Organization**:
   - `/api/auth/*` (register, login, getMe, updateProfile)
   - `/api/jobs/*` (job CRUD)
3. **Error Handling**: Currently uses basic try-catch; consolidate error responses for consistency
4. **Middleware Stack**:
   - express.json()
   - cors() (allow all origins in dev)
   - Helmet (security headers) - imported but verify enabled
   - Morgan (request logging)

---

## Critical Integration Points

- **Frontend → Backend Communication**: `api.ts` Axios instance (may need interceptor for token attachment)
- **Authentication Persistence**: LocalStorage for token + user object; verify cleanup on logout
- **Geolocation**: Pilot `baseLocation` uses MongoDB 2dsphere index for location-based queries (e.g., find pilots near farmer)
- **Socket.io**: Imported in server but verify if integrated for real-time job updates

---

## Project-Specific Gotchas

- **Password Field**: User model excludes password by default; auth controller explicitly uses `.select('+password')` for login
- **CORS**: Currently allows all origins; tighten before production
- **Environment Variables**: Check `.env` setup for `JWT_SECRET`, `MONGODB_URI`, `NEXT_PUBLIC_API_URL`
- **Frontend TypeScript**: Some `any` types in AuthContext; consider stricter typing for User interface

---

## Common Tasks

- **Add New API Endpoint**: Create route in `/server/routes/*`, controller in `/server/controllers/*`, wire in `server.js`
- **Add Protected Frontend Page**: Wrap with `<RoleGuard allowedRole="pilot">` and use `useAuth()` for user data
- **Update User Profile**: PUT `/api/auth/profile` (protected); sync localStorage on frontend after response
