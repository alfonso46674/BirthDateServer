# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Use the .env file to set environment variables
ENV $(cat .env | xargs)

# Expose the port that the application runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
