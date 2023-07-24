FROM node:lts-alpine

RUN mkdir -p /home/ubuntu/app

WORKDIR /home/ubuntu/app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "start:dev"]