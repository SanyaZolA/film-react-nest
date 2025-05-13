
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install @rollup/rollup-linux-x64-gnu --save-optional

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "run", "dev", "--", "--host"]
