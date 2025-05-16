FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=optional


COPY . .

RUN npm run build
