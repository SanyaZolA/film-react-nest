FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-optional

COPY . .

RUN npm run build
