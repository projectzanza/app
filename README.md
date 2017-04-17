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
