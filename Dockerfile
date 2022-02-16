FROM node:16.13.2

WORKDIR /src

COPY package-lock.json .
COPY package.json .

RUN npm ci 

COPY src ./src
COPY views ./views
COPY .env .

CMD npm start