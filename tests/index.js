const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const { size } = require('lodash');
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

// { commandName: { documentation, command, description } }
const allCommands = require(path.join(__dirname, '..', 'actions', 'sources', 'index.js'));
const allFilesLength = fs.readdirSync(path.join(__dirname, '..', 'actions', 'sources', 'commands')).length;

for (let commandName in allCommands) {
    const value = allCommands[commandName];
    const documentation = value.documentation;
    const command = value.command;
    const description = value.description;

    describe(`General Tests for command: ${commandName}`, () => {
        describe(`Short hands are all clean`, () => {
            it(`All short hands are unique and exist`, () => {
                expect((allFilesLength * 2) === size(allCommands)).to.be.true;
            });
        });
        describe(`Documentation Tests`, () => {
            it('Documentation is a Function', () => {
                expect(typeof documentation === 'function').to.be.true;
            });
            it('Documentation does not have a return', () => {
                expect(documentation() === undefined).to.be.true;
            });
        });
        describe(`Command Tests`, () => {
            it('Command is a Function', () => {
                expect(typeof command === 'function').to.be.true;
            });
        });
        describe(`Description Tests`, () => {
            it('Description is a String', () => {
                expect(typeof description === 'string').to.be.true;
            });
        });
    });
}
