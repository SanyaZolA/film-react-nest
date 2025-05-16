FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=optional


COPY . .

RUN npm run build
