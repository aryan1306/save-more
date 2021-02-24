FROM node:14

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

COPY .env .env

ENV NODE_ENV=production

EXPOSE 8080

CMD [ "node", "dist/index.ts" ]
USER node