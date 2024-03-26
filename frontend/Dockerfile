FROM node:16

WORKDIR /app/frontend

RUN npm install -g http-server

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

ENV VITE_APP_BACKEND="http://localhost:3000"

RUN npm run build

EXPOSE 8080

CMD [ "http-server", "dist" ]
