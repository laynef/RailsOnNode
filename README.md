# Rails On Node: Opinionated Node.js Framework

## Requirements
- Node.js >= 8
- Redis >= 4

## Features
- Create a new multithread Node.js server with Pug templating with 8 threads (Ruby on Rails has 5 for their server's scalibity)
- Setup your own database (any SQL database or MongoDB)
- Generate new api controllers
- Generate new api versions
- Creates automatic API documentation for endpoints on creation with no extra configuration
- Generate new pages with assets with a custom route with code splitting

## Coming Soon
- Generate server side React Application
- Generate server side Angular 4 Application
- Generate server side Vue Application

## Installation
```
// brew install redis
// Must have redis running on default port 6379: redis-server
npm i -g rails-on-node
node-rails create <Your project>
node-rails setup-data-base <Your database type [sql *or* mongodb]>
node-rails new-api-controller users --version=1 // Add new controler in version 1
node-rails new-page blogs '/blogs' // Add new route
npm install
npm run build:prod
npm start
```

## Development
```
npm install
npm run build:dev
npm run dev
```

## API Documentation
```
API Version V1
http://localhost:8080/docs/v1/

API Version V2
http://localhost:8080/docs/v2/

...etc
```

## Settings
- Set different style types
```
node-rails settings sass
node-rails settings less
node-rails settings css // default
```

## Documentation
```
// For all commands
node-rails

// For a single command
node-rails <command-name> --help
```

## New Routes
```
// brew install redis
// Must have redis running on default port 6379: redis-server
npm i -g rails-on-node
node-rails create <Your project>
node-rails setup-data-base <Your database type [sql *or* mongodb]>
node-rails new-api-controller users
node-rails new-page blogs '/blogs'
npm install
npm run build:prod
npm start
```