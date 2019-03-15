# Rails On Node: Opinionated Node.js Framework

<div style="text-align:center"><img src ="https://railsonnode.com/assets/img/rails-black.svg" /></div>

Check out the API Documentation: https://railsonnode.com/

Stable Version 1.3.2

## Requirements

- Node.js >= 8
- Redis >= 4

## Features

- Create a new multithread Node.js server with Pug templating with 8 threads (Ruby on Rails has 5 for their server's scalibity)
- Setup your own database (any SQL database or MongoDB)
- Generate new api controllers
- Generate new api versions
- Creates automatic API documentation for endpoints on creation with no extra configuration
- Creates automatic unit tests for endpoints on creation with no extra configuration
- Generate new pages with assets with a custom route with code splitting
- Use serverside React or Vanilla JS (JQuery, etc.)

## Coming Soon

- Generate server side Angular 4 Application
- Generate server side Vue Application

## Installation

```bash
// brew install redis
// Must have redis running on default port 6379: redis-server
npm i -g rails-on-node
npm i -g sequelize-cli
npm i -g mongoose-model-cli
node-rails create <Your project>
node-rails setup-data-base <Your database type [sql *or* mongodb]>
node-rails new-api-controller users
node-rails new-page blogs '/blogs' // Add new route
npm install
npm run build:prod
npm start
```

## CLI Documentation

```bash
// For all commands
node-rails

// For a single command
node-rails <command-name> --help
```
