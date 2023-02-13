FROM node:lts as andreadelligatti-base

WORKDIR /app

COPY lerna.json .
COPY nx.json .
COPY package.json package-lock.json ./

WORKDIR /app

RUN npm install

FROM andreadelligatti-base

WORKDIR /app/packages/receiver
COPY ./packages/receiver/build ./build
COPY ./packages/receiver/package.json ./package.json
COPY ./packages/receiver/package-lock.json ./package-lock.json

WORKDIR /app

RUN npm run bootstrap

CMD ["npm", "start"]