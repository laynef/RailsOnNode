#!/usr/bin/env node --experimental-repl-await

const Commander = require('./commander');
const colors = require('colors/safe');

console.blue = (str) => { console.log(colors.blue(str)); };
console.green = (str) => { console.log(colors.green(str)); };
console.cyan = (str) => { console.log(colors.cyan(str)); };
console.red = (str) => { console.log(colors.red(str)); };
console.yellow = (str) => { console.log(colors.yellow(str)); };
console.white = (str) => { console.log(colors.white(str)); };
console.magenta = (str) => { console.log(colors.magenta(str)); };
console.gray = (str) => { console.log(colors.gray(str)); };
console.grey = (str) => { console.log(colors.grey(str)); };

const user = process.argv.slice(2);
const command = user[0];

const args = [];
const flags = [];

for (var i = 1; i < user.length; i++) {
    if (command === 'db') {
        args.push(user[i].toString());
    } else if (user[i].indexOf('--') === 0) {
        const array = user[i].slice(2).split('=');
        if (array.length === 1) {
            const object = {};
            object[array[0]] = true;
            flags.push(object);
        } else {
            const object = {};
            object[array[0]] = array[1];
            flags.push(object);
        }
    } else {
        args.push(user[i]);
    }
}

const start = new Commander(command, args, flags);

start.execute();
