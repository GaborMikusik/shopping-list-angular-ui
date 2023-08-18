# Use an official Node.js runtime as the base image
FROM node:18 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app to the container
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use a lightweight Nginx image as the final base image
FROM nginx:alpine

# Copy the built app from the previous stage to the Nginx directory
COPY --from=builder /app/dist/* /usr/share/nginx/html/

# Expose port 80 to the outside world
EXPOSE 80

# Command to start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
