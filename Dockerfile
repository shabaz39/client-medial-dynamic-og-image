# Stage 1: Build Stage
FROM node:20 AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clear npm cache, update npm, and install dependencies
RUN npm cache clean --force \
    && npm install -g npm@latest \
    && npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM node:20 AS runner

WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app ./

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
