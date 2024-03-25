FROM node:14

WORKDIR /app/backend

COPY backend/package*.json ./

RUN npm install

COPY backend/ ./

EXPOSE 3000

CMD [ "npm", "run", "start" ]
