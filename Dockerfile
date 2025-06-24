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

# Set the command to run when the container starts, using the ABSOLUTE path.
CMD ["/usr/local/bin/start.sh"]
