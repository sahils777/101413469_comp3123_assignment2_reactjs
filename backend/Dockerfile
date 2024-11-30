FROM node:16

RUN apt-get update && apt-get install -y python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm ci
RUN npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000

CMD ["npm", "start"]