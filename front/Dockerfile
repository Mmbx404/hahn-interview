# Build stage
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
