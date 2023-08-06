# Stage 1
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d
RUN rm -rf /usr/share/nginx/html/*  
COPY --from=builder /app/dist /usr/share/nginx/html