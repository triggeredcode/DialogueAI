# Stage 1: Build the Backend
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Stage 2: Build the Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .

# Stage 3: Final Image
FROM node:20-alpine
WORKDIR /app

# Copy the built backend application from the backend-builder stage
COPY --from=backend-builder /app/backend /app/backend

# Copy the built frontend application (development version) from the frontend-builder stage
COPY --from=frontend-builder /app/frontend /app/frontend

# Copy the startup script into the container and make it executable
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Expose the ports that the backend (3000) and frontend (5173) will listen on.
EXPOSE 3000
EXPOSE 5173

# Set the ENTRYPOINT to your start.sh script.
# This makes start.sh the primary executable for the container.
ENTRYPOINT ["/usr/local/bin/start.sh"]

# CMD is now optional. If you had arguments to pass to start.sh, they would go here.
# Since start.sh runs the services directly, we don't need a CMD here.
CMD []
