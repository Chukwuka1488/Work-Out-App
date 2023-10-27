# Build stage
FROM node:20.9.0-slim AS build

LABEL maintainer="Haykay"

RUN useradd frontend

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Build the React app for production
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build folder from build environment
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# New step: Replace the default Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3005

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]



# FROM node:20.9.0-slim
# LABEL maintainer="Haykay"
# RUN useradd userui
# WORKDIR /app
# COPY . .
# RUN npm install
# EXPOSE 3005
# USER userui
# CMD ["npm", "start"]