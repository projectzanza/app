FROM alpine

ENV APP_HOME /app

RUN apk add --update --no-cache nodejs nodejs-npm

RUN mkdir $APP_HOME
COPY ./src $APP_HOME/src
COPY webpack.config.js \
  README.md \
  package.json \
  jquery-stub.js \
  .eslintrc \
  .babelrc \
  $APP_HOME/
WORKDIR $APP_HOME
RUN npm install && npm run build
EXPOSE 8080
CMD npm run build:watch
