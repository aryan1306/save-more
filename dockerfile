FROM node:15

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .
COPY .env .env

EXPOSE 8080

ENV NODE_ENV=production

CMD [ "ts-node", "src/index.ts" ]
USER node