FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
ENV NODE_ENV=development
RUN npm ci
COPY . .
RUN npm run build
RUN npm install -g serve
ENV NODE_ENV=production
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]

