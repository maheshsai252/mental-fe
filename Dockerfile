# Use the official Node.js runtime as a base image
FROM node:20.9.0-slim

# Set the working directory in the container
WORKDIR /usr/src/app
# Copy the current directory contents into the container
COPY package.json package.json

# Install any needed packages specified in package.json
RUN npm install -g npm@latest
RUN npm install serve -g
RUN npm install --force

# Build the source code
COPY . .
RUN npm run build

# Make port 3000 available to the world outside this container
EXPOSE 3002

# Run npm start to start the server
CMD ["serve", "-l", "3002", "-s", "build"]