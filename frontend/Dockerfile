FROM node:14.16.1
WORKDIR /client
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]