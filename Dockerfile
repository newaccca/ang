# # Stage 1
# FROM node:latest as node
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build --prod
# # Stage 2
# FROM nginx:alpine
# COPY --from=node /app/dist/test /usr/share/nginx/html

FROM node:16-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/test/ /usr/share/nginx/html
EXPOSE 80













