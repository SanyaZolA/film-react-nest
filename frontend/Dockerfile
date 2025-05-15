FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install @rollup/rollup-linux-x64-gnu 

RUN npm install

COPY . .

RUN npm run build