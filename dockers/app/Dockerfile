# Step 1: Use an official Node.js runtime as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the application code to the container
COPY . .

## Step 6: Build the Vite app for production
#RUN npm run build
#
## Step 7: Set the command to serve the application with Vite's development server
#CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
#
## Expose the port used by the Vite dev server
#EXPOSE 5173

# Expose the port used by Vite
EXPOSE 5173

# Set the default command to run Vite
CMD ["npm", "run", "dev"]