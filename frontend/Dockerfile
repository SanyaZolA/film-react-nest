FROM node:20

WORKDIR /app

COPY package*.json ./
RUN rm -rf node_modules package-lock.json

RUN npm install --omit=optional


COPY . .

RUN npm run build
