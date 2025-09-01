FROM node:18-alpine
WORKDIR /app
COPY public ./public
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", "public", "-l", "80"]

