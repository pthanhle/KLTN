# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Full-stack automotive service management system with four subprojects:
- `frontend/` — React 18 + Vite (customer & admin web)
- `backend/` — Node.js + Express v5 (REST API + WebSocket)
- `mobile/` — Flutter (staff roles: service advisor, sales, warehouse, technician)
- `ai_service/` — FastAPI + Google Gemini (AI chat assistant)

## Commands

### Frontend (`frontend/`)
```bash
npm run dev        # dev server on :3000
npm run build      # production build
npm run lint       # ESLint
```

### Backend (`backend/`)
```bash
node --env-file=.env server.js       # start server (port 5000)
node --env-file=.env scripts/createsuperuser.js  # create admin user
```
Requires: MongoDB URI in `.env` as `MONGO_URI`, Redis running on :6379.

### Mobile (`mobile/`)
```bash
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs  # codegen (Freezed, Retrofit, JSON)
flutter run
```

### AI Service (`ai_service/`)
```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Full Stack (Docker)
```bash
docker-compose up --build
```
Starts: Redis, backend (:5000), frontend (:3000), ai-service (:8000).

## Architecture

### Backend
- **ESM modules** (`"type": "module"`) — use `import/export`, not `require`.
- **Route hierarchy**: `server.js` mounts four route groups:
  - `/api/admin` → `routes/admin/index.route.js`
  - `/api/client` → `routes/client/index.route.js`
  - `/api/staff` → `routes/staff/index.route.js`
  - `/api/ai` → `routes/AI/AI.route.js`
- **Auth middleware** (`middleware/authMiddleware.js`): JWT Bearer token decoded into `req.user` with `role_id` populated. Role guards: `protect`, `admin`, `inventoryStaff`, etc.
- **Roles**: `admin`, `service`, `sale`, `inventory`, `customer`, `guest`
- **Async jobs**: BullMQ + Redis for email (`queues/emailQueue.js`) and image processing (`queues/imageQueue.js`), consumed by workers in `workers/`.
- **Real-time**: Socket.IO authenticated via JWT; rooms: `user_{id}`, `room_admin`, `room_service`, `room_sale`, `room_inventory`.
- **Image uploads**: Cloudinary via `routes/common/upload.route.js`.
- **DB**: Mongoose + MongoDB; all models registered in `models/index.js`.

### Frontend
- **`@` alias** resolves to `src/` (configured in `vite.config.js`).
- **TailwindCSS v4** (via `@tailwindcss/vite` plugin) — no `tailwind.config.js`.
- **State**: Redux Toolkit — only `auth`, `wishlist`, `cart` slices. Server state uses TanStack Query.
- **Routing** (`src/routes/AppRoutes.jsx`): React Router v7, all pages lazy-loaded. `ProtectedRoute` takes `allowedRoles` and `requireLogin`. Two layouts: `CustomerLayout` and `AdminLayout`.
- **API layer**: Axios instances in `src/services/api/`; `src/services/socket.js` for Socket.IO client.
- **Page structure**: `src/pages/Admin/`, `src/pages/Customer/`, `src/pages/Shared/`. Complex pages use a co-located `hooks/use<PageName>Logic.js` hook for data fetching and state.

### Mobile
- **State**: Riverpod (`flutter_riverpod`).
- **Navigation**: `go_router` — routes defined per role in `lib/roles/<role>/routes/<role>_routes.dart`, composed in `lib/core/routes/app_router.dart`.
- **API**: Retrofit + Dio. Base URL: `http://10.0.2.2:5000/api` (Android emulator), `http://localhost:5000/api` (iOS/Web). Configured in `lib/core/config/api_config.dart`.
- **Code generation**: Freezed (immutable models), `json_serializable`, `retrofit_generator`. Run build_runner after modifying annotated files.
- **Feature structure**: `lib/roles/<role>/features/<feature>/` containing `widgets/`, `models/`, with data mocks under `data/mocks/`.
- **Localization**: `easy_localization` with JSON files in `assets/locales/vi/` and `assets/locales/en/`.

### AI Service
- FastAPI app at `app/main.py`; single router mounted at `/ai`.
- Uses `motor` (async MongoDB driver) and `google-generativeai` (Gemini).
- Redis used for session/cache.

## Key Data Contracts

**Hotspot coordinates** (vehicle damage map):
- Mobile stores `x` (horizontal, 0–1 left→right) and `y` (vertical, 0–1 top→bottom) in landscape image space.
- Backend API returns raw `x`/`y` fields in `damage_map` array items.
- Mobile `HotspotModel.toJson()` serializes as `left: "${x*100}%"`, `top: "${y*100}%"`.
- Web frontend (`useTrackingDetailLogic.js`) maps `h.x → left`, `h.y → top` as percentage strings — these are landscape coordinates and must be used directly as CSS `left`/`top` on a landscape-oriented container (not rotated).

**Staff auth**: Staff users log in via `/api/staff/auth`; mobile stores token in `shared_preferences`. Web staff routes are under `/api/staff` with role-based middleware.
