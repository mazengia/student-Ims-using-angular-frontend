FROM node:latest as build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
FROM nginx:latest
EXPOSE 80
COPY --from=build /app/dist/student_frontEnd /usr/share/nginx/html
