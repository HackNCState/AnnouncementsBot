# Use the official Node.js image as the base image
FROM arm64v8/node:23.7.0

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

CMD [ "npm", "start" ]