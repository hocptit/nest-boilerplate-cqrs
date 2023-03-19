FROM node:16.19.0 AS build
COPY . ./

RUN ls -la

RUN yarn install

RUN yarn run build

FROM node:16.19.0 as main

ARG PORT=3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=build dist /usr/src/app/dist
COPY --from=build node_modules /usr/src/app/node_modules

COPY . /usr/src/app

EXPOSE $PORT

CMD [ "yarn", "start:prod" ]
