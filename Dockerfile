# Multi-stage build for Angular Frontend
# Stage 1: Build the Angular app
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files first (for Docker cache optimization)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build for production
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx (smaller image)
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist/cinema-client /usr/share/nginx/html

# Custom Nginx config for Single Page Application (SPA)
# This ensures all routes are redirected to index.html (Angular routing)
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

