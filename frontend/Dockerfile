FROM node:20 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx to serve the built app
FROM nginx:alpine

# Copy the build folder from build environment
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 3005

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]