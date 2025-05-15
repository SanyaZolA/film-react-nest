FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN echo $VITE_API_URL
CMD ["node", "dist/main.js"]
