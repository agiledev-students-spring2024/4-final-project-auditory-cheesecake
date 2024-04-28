#build the React application
FROM node:16 as build-stage

#set the working directory for the React app
WORKDIR /app/frontend

#copy the package.json and package-lock.json 
COPY frontend/package*.json ./

#install dependencies
RUN npm install

#copy the frontend code into the Docker image
COPY frontend/ .

#build the React app
RUN npm run build

#stage 2: Set up the NodeJS application
FROM node:lts-alpine

#set the working directory for the backend
WORKDIR /app

#copy the backend package.json and package-lock.json
COPY back-end/package*.json ./

#install dependencies for the backend
RUN npm install

#copy the backend code into the Docker image
COPY back-end/ .

#copy the built React app from the previous stage
COPY --from=build-stage /app/frontend/build ./public

#expose the port the NodeJS app runs on
EXPOSE 1337

#command to run the NodeJS application
CMD ["npm", "start"]
