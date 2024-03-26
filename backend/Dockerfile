# Stage 1: Build
FROM node:16 AS build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

# Stage 2: Production
FROM node:16-alpine
WORKDIR /app/backend
COPY --from=build /app/backend/dist ./dist
COPY --from=build /app/backend/node_modules ./node_modules
COPY --from=build /app/backend/package.json ./
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
