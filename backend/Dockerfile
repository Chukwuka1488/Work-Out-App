# Use an official Node.js runtime as the base image
FROM node:20.9.0-slim

# Metadata as described
LABEL maintainer="Haykay"

# Create a non-root user
RUN useradd backend && mkdir /app && chown backend:backend /app

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container first
# This optimizes Docker's caching mechanism
COPY package*.json ./

# Install only production dependencies
# This reduces the image size by not installing devDependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Switch to the non-root user for better security
USER backend

# Set the HOME environment variable to /app
ENV HOME=/app

# Expose the port the app runs on
EXPOSE 4000

ENV MONGO_URI=""

# Command to run the application
CMD ["npm", "start"]

