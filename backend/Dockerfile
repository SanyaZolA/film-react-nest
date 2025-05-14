# Stage 1: Сборка бэкенда
FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
