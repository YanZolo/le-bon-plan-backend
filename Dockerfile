FROM node:16.13.2

WORKDIR /src

COPY yarn.lock .
COPY package.json .

RUN yarn install --frozen-lockfile

COPY src ./src
COPY Views ./Views

CMD yarn start