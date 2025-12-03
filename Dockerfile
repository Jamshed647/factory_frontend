# Stage 1: Build the Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .
COPY .env.production .env

# Build the Next.js app
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS production

WORKDIR /app

# Copy built assets from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
#COPY --from=builder /app/next.config.ts ./next.config.ts  # Adjust if using next.config.js

# Expose the port Next.js runs on
EXPOSE 3080

# Run the app in production mode
CMD ["npm", "start"]
