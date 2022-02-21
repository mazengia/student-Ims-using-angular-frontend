FROM node:latest as build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
FROM nginx:alpine
EXPOSE 8080
COPY --from=build /app/dist/student_frontEnd /usr/share/nginx/html
