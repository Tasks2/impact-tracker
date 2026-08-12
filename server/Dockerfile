FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

RUN chmod +x docker-entrypoint.sh


EXPOSE 3000

CMD ["./docker-entrypoint.sh"]