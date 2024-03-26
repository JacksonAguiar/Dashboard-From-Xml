FROM node:16

WORKDIR /app/frontend

RUN npm install -g http-server

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]
