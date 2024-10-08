FROM node:21-alpine

WORKDIR /app

COPY ./ /app

RUN npm install
RUN npx prisma generate

RUN npm run build

EXPOSE 6379

# Set the default command to run your application
CMD ["sh", "-c", "npx prisma db push && npm run start"]

