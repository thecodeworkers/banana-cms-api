FROM node:14-alpine

EXPOSE 4000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD package.json /usr/src/app
RUN yarn install

ADD . /usr/src/app

CMD ["yarn", "develop"]
