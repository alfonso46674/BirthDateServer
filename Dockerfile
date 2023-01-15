# Use the official Node.js image as the base image
FROM node:14

# Create the app directory
RUN mkdir -p /usr/src/app

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY server/package*.json /usr/src/app/

# Install the dependencies
RUN npm i

# Copy the server files to the working directory
COPY server/. /usr/src/app/

# Copy the vue application files
COPY ui/. /usr/src/app/ui/

# Build the Vue.js application
RUN cd /usr/src/app/ui && npm i && npm run build

# Use the .env file to set environment variables
ENV $(cat server/.env | xargs)

# Expose the port on which the server will run
EXPOSE 3000

# Start the Node.js server
CMD ["npm", "start"]
