#!/bin/bash

# Start the backend server in the background
echo "Starting DialogueAI Backend..."
# The --prefix option ensures npm operates within the backend directory
npm start --prefix /app/backend &

# Start the frontend development server
echo "Starting DialogueAI Frontend Development Server..."
# The --prefix option ensures npm operates within the frontend directory
# This command runs in the foreground, so its logs will be visible in the Docker container output
npm run dev --prefix /app/frontend

# Keep the script running (optional, as npm run dev usually keeps it alive)
# wait -n # Waits for the first background job to exit, which might not be desired
wait # Waits for all background jobs to complete, but we want npm run dev to stay foreground
