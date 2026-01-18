# 🎬 Cinema Management System - Frontend

Angular-based frontend application for managing cinema operations, including film projections, room management, and ticket reservations.

**Version:** 17.3.12  
**Author:** Ali KHLIFI  
**Last Updated:** 2026-01-10

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Recent Refactoring](#recent-refactoring)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Build & Deploy](#build--deploy)

---

## ✨ Features

- 🏙️ **City & Cinema Management** - Browse cinemas by city
- 🎥 **Film Projections** - View scheduled film screenings
- 🪑 **Room Management** - Explore cinema rooms and seating
- 🎫 **Ticket Reservations** - Book tickets for film projections
- 🔐 **Keycloak Authentication** - Secure user authentication
- 🔍 **Search & Filter** - Find cinemas by name or location
- 📱 **Responsive Design** - Works on desktop and mobile

---

## 🛠 Tech Stack

- **Framework:** Angular 17.3.12
- **Language:** TypeScript 5.4.5
- **Authentication:** Keycloak Angular 15.3.0
- **Styling:** Bootstrap 3.4.1
- **HTTP Client:** Angular HttpClient
- **State Management:** RxJS 7.8.0
- **Build Tool:** Angular CLI 17.3.17

---

## 📁 Project Structure

```
cinema-front/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── villes/          # City list component
│   │   │   ├── salles/          # Room list component
│   │   │   ├── film-projections/
│   │   │   ├── search/
│   │   │   └── ticket-payment/
│   │   ├── pages/               # Page-level components
│   │   │   ├── cinema/          # Cinema browsing page
│   │   │   ├── films/           # Film catalog page
│   │   │   ├── home/            # Homepage
│   │   │   ├── evenements/      # Events page
│   │   │   └── offres/          # Offers page
│   │   ├── services/            # API services
│   │   │   ├── city/            # City service (NEW)
│   │   │   ├── room/            # Room service (NEW)
│   │   │   ├── seat/            # Seat service (NEW)
│   │   │   ├── reservation/     # Reservation service (NEW)
│   │   │   ├── price-type/      # Price type service (NEW)
│   │   │   ├── cinema/          # Cinema service (UPDATED)
│   │   │   ├── film/
│   │   │   ├── film-projection/ # Film projection service (UPDATED)
│   │   │   ├── ticket/
│   │   │   └── security/        # Keycloak integration
│   │   ├── models/              # TypeScript interfaces
│   │   │   ├── city.model.ts    # City model (NEW)
│   │   │   ├── room.model.ts    # Room model (NEW)
│   │   │   ├── seat.model.ts    # Seat model (NEW)
│   │   │   ├── reservation.model.ts  # Reservation model (NEW)
│   │   │   ├── price-type.model.ts   # Price type model (NEW)
│   │   │   ├── user.model.ts    # User model (NEW)
│   │   │   ├── cinema.model.ts  # Cinema model (UPDATED)
│   │   │   ├── film.model.ts    # Film model (UPDATED)
│   │   │   ├── film-projection.model.ts  # (UPDATED)
│   │   │   ├── ticket.model.ts  # Ticket model (UPDATED)
│   │   │   └── index.ts         # Central export (NEW)
│   │   ├── app-routing.module.ts
│   │   ├── app.module.ts
│   │   └── app.component.ts
│   ├── environments/
│   │   ├── environment.ts       # Development config
│   │   └── environment.prod.ts  # Production config
│   ├── assets/                  # Static assets
│   ├── styles.css               # Global styles
│   └── index.html
├── REFACTORING-PLAN.md          # Detailed refactoring plan
├── MIGRATION-SUMMARY.md         # Migration summary & checklist
├── angular.json
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** 18.x or higher
- **npm:** 9.x or higher
- **Angular CLI:** 17.x

```bash
npm install -g @angular/cli@17
```

### Installation

1. **Clone the repository:**
```bash
cd cinema-front
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment:**

Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  API_URL: 'http://localhost:8082/api'  // Backend API URL
};
```

4. **Start development server:**
```bash
ng serve
```

5. **Open browser:**
```
http://localhost:4200
```

---

## 💻 Development

### Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

```bash
ng serve --open  # Opens browser automatically
```

### Code Scaffolding

Generate new components, services, etc.:

```bash
# Component
ng generate component components/my-component

# Service
ng generate service services/my-service/my-service

# Model (interface)
ng generate interface models/my-model
```

### Build

Build the project for production:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
# Unit tests
ng test

# Code coverage
ng test --code-coverage
```

---

## 🔄 Recent Refactoring (2026-01-10)

The frontend has undergone a **major refactoring** to align with the backend API changes. See `MIGRATION-SUMMARY.md` for full details.

### Key Changes:

#### ✅ **Models Migration**
- French naming → English naming
- `Ville` → `City`
- `Salle` → `Room`
- `Seance` → Merged into `FilmProjection`
- Added: `Seat`, `Reservation`, `PriceType`, `User`

#### ✅ **Services Migration**
- New services: `CityService`, `RoomService`, `SeatService`, `ReservationService`, `PriceTypeService`
- Updated services with proper error handling and TypeScript typing
- Deprecated old services (kept for backward compatibility)

#### ✅ **Components Migration**
- Updated `CinemaComponent`, `VillesComponent`, `SallesComponent`
- Added error handling and loading states
- Added JSDoc comments
- Maintained backward compatibility with templates

#### ✅ **Code Quality**
- Removed `any` types
- Added proper TypeScript interfaces
- Error handling with RxJS `catchError` and `retry`
- English naming conventions throughout

### Backward Compatibility

All changes are **backward compatible**. Old code will continue to work with deprecation warnings in the console.

---

## 🔌 API Integration

### Backend API

The frontend connects to a Spring Boot backend API.

**Default URL:** `http://localhost:8082/api`

### API Endpoints

#### Cities
```
GET /api/city                    # Get all cities
GET /api/city/{id}               # Get city by ID
GET /api/city/search?name={name} # Search cities
```

#### Cinemas
```
GET /api/cinema                  # Get all cinemas
GET /api/cinema/{id}             # Get cinema by ID
GET /api/cinema/by-city?cityName={name}  # Get cinemas by city
GET /api/cinema/city/{cityId}    # Get cinemas by city ID
```

#### Rooms
```
GET /api/room                    # Get all rooms
GET /api/room/{id}               # Get room by ID
GET /api/room/cinema/{cinemaId}  # Get rooms by cinema
```

#### Film Projections
```
GET /api/film-projection                 # Get all projections
GET /api/film-projection/{id}            # Get projection by ID
GET /api/film-projection/room/{roomId}   # Get projections by room
GET /api/film-projection/film/{filmId}   # Get projections by film
```

#### Seats
```
GET /api/seat/room/{roomId}      # Get seats by room
GET /api/seat/available?filmProjectionId={id}  # Get available seats
```

#### Reservations
```
POST /api/reservation            # Create reservation
GET /api/reservation/my-reservations  # Get user's reservations
GET /api/reservation/{id}        # Get reservation by ID
DELETE /api/reservation/{id}     # Cancel reservation
```

---

## 🔐 Authentication

The application uses **Keycloak** for authentication.

### Configuration

Keycloak configuration is in `app.module.ts`:

```typescript
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',  // Keycloak server URL
        realm: 'cinema-realm',
        clientId: 'cinema-client'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}
```

### Protected Routes

Some routes require authentication. Keycloak automatically handles:
- Login redirect
- Token management
- Token refresh
- Logout

---

## 🏗 Build & Deploy

### Production Build

```bash
ng build --configuration production
```

Output: `dist/cinema-client/`

### Environment Configuration

**Development** (`environment.ts`):
```typescript
export const environment = {
  production: false,
  API_URL: 'http://localhost:8082/api'
};
```

**Production** (`environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  API_URL: 'https://api.cinema.com/api'  // Update with production URL
};
```

### Docker Deployment (Optional)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/cinema-client /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t cinema-frontend .
docker run -p 80:80 cinema-frontend
```

---

## 📚 Documentation

- **Refactoring Plan:** See `REFACTORING-PLAN.md`
- **Migration Summary:** See `MIGRATION-SUMMARY.md`
- **Angular Docs:** https://angular.io/docs
- **Keycloak Angular:** https://github.com/mauriciovigolo/keycloak-angular

---

## 🐛 Troubleshooting

### Backend Connection Issues

**Error:** `Failed to load cinemas`

**Solution:**
1. Verify backend is running: `http://localhost:8082/api`
2. Check CORS configuration in backend
3. Verify `environment.ts` has correct API_URL

### Keycloak Authentication Issues

**Error:** `Keycloak initialization failed`

**Solution:**
1. Verify Keycloak server is running: `http://localhost:8080`
2. Check realm and client configuration
3. Verify redirect URIs in Keycloak admin console

### Deprecation Warnings in Console

**Warning:** `getVilles() is deprecated. Use getCities() instead.`

**Solution:** These are intentional during migration. They don't affect functionality. To remove them, update component templates to use new property names.

---

## 🧪 Testing Checklist

- [ ] Homepage loads without errors
- [ ] City list displays
- [ ] Cinema list displays when city is selected
- [ ] Search functionality works
- [ ] Room list displays when cinema is selected
- [ ] Film projections display for each room
- [ ] Keycloak login works
- [ ] No console errors (deprecation warnings are OK)

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify backend is running
3. Check API endpoints in Network tab
4. Review `MIGRATION-SUMMARY.md` for recent changes

---

## 📄 License

This project is part of an educational formation.

---

## 👤 Author

**Ali KHLIFI**

---

## 🎉 Changelog

### 2026-01-10 - Major Refactoring
- ✅ Migrated all models to English naming
- ✅ Created new services (City, Room, Seat, Reservation, PriceType)
- ✅ Updated all components with proper typing and error handling
- ✅ Added comprehensive documentation
- ✅ Maintained backward compatibility

### Previous Versions
- Initial Angular 17 setup
- Keycloak integration
- Basic cinema browsing functionality

---

**Happy Coding! 🚀**
