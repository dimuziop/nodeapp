const fs = require('fs');
const app = require('./src/app');

let miVar = 'this is a var';

const add = (a, b) => {
  return a +b
};

const giveMyNotes = (file) => {
  return fs.readFileSync(file, 'utf8');
};

//fs.appendFileSync('notes.txt', inde(5,8) + ' \n');

module.exports = giveMyNotes;
