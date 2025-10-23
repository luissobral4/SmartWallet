FROM node:22-alpine as final

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]