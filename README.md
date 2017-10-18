# APP

### Dependencies
  - node v6.6.0
  - npm 4.1.2

### Run the frontend app
It's quicker to run the frontend from local machine instead of docker,
as watching files change on a mounted docker volume is extremely slow (10x so)
```
cd zanza/app
npm install

# run tests
npm run test
# run standalone lint, and auto fix errors
npm run lint
# run frontend dev server 
npm run build:watch
```

### Building for an environment
Webpack will build for a local instance by default.
The config files are in ./src/app/config

To build for development or production, set the NODE_ENV environment variable when building.

```
NODE_ENV=development npm run build
```

To build the a docker instance with the source and dev files - 
```
docker build --build-arg NODE_ENV=development . -t zanza/app:latest
```
