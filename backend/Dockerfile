 # Use an official Node.js runtime as the base image
FROM node:20 

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the application's dependencies inside the container
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Expose port 8008 to communicate with the application
EXPOSE 8008

# Command to run the application
CMD ["node", "server.js"]