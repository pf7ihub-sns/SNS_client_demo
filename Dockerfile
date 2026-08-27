# Stage 1: Build the React Frontend
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Setup the Node.js Express Backend
FROM node:22-alpine

WORKDIR /app

# Copy backend package.json and install production dependencies
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

# Copy the Express backend code
COPY server/ ./server/

# Copy the built React app from Stage 1 to the dist folder
COPY --from=build /app/dist ./dist

# The backend will serve the static files from ../dist based on the server.js path
WORKDIR /app/server

# Expose the API and Web server port
EXPOSE 5001

# Start the application
CMD ["npm", "start"]
