FROM node:14.16.1

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY . /app

EXPOSE 5000

CMD npm run server