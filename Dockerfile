FROM node:22-alpine as final

WORKDIR /app

COPY ./src/package*.json .

RUN npm install --only=production

COPY ./src .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]