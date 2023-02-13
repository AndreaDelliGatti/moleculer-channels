FROM node:lts as andreadelligatti-base

WORKDIR /app

COPY lerna.json .
COPY nx.json .
COPY package.json package-lock.json ./

WORKDIR /app

RUN npm install

FROM andreadelligatti-base

WORKDIR /app/packages/sender
COPY ./packages/sender/build ./build
COPY ./packages/sender/package.json ./package.json
COPY ./packages/sender/package-lock.json ./package-lock.json

WORKDIR /app

RUN npm run bootstrap

CMD ["npm", "start"]