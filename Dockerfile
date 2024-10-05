# Use the oficial Node.js base image
FROM node:18

# workdirectory on the container
WORKDIR /usr/src/app

# copy files
COPY package*.json ./

# Install Node.js 
RUN npm install --only=production

# copy all files over to container
COPY . .

# Expose port 3000 to the container
EXPOSE 3000

# start the application
CMD ["npm", "start"]
