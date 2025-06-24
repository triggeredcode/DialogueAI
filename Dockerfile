# Stage 1: Build the Backend
# We use a Node.js image to install dependencies and copy backend code.
FROM node:20-alpine AS backend-builder

# Set the working directory inside the container for the backend
WORKDIR /app/backend

# Copy package.json and package-lock.json first to leverage Docker's caching.
# This ensures npm install only runs if these files change.
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend source code
COPY backend/ .

# Stage 2: Build the Frontend
# We use another Node.js image for the frontend build process.
FROM node:20-alpine AS frontend-builder

# Set the working directory inside the container for the frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json first for caching.
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY frontend/ .

# Stage 3: Final Image
# Use a lean Node.js image for the final runtime environment.
FROM node:20-alpine

# Set the main working directory for the application
WORKDIR /app

# Copy the built backend application from the backend-builder stage
COPY --from=backend-builder /app/backend /app/backend

# Copy the built frontend application (development version) from the frontend-builder stage
COPY --from=frontend-builder /app/frontend /app/frontend

# Copy the startup script into the container and make it executable
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Expose the ports that the backend (3000) and frontend (5173) will listen on.
# Adjust these if your actual applications use different ports.
EXPOSE 3000
EXPOSE 5173

# Set the command to run when the container starts.
# This executes our start.sh script to concurrently run both services.
CMD ["start.sh"]

