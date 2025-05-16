FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install @rollup/rollup-linux-arm64-gnu


RUN npm i

COPY . .

RUN npm run build
