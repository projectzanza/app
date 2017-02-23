FROM alpine

ENV APP_HOME /app

RUN apk add --update --no-cache nodejs

RUN mkdir $APP_HOME
COPY . $APP_HOME
WORKDIR $APP_HOME
EXPOSE 8080
CMD npm install && npm run start
