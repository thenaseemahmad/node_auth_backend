FROM node:alpine

WORKDIR /app

COPY package.json /app/

RUN npm install --omit=dev

COPY . .

CMD [ "npm","start" ]