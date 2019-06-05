let validator = require('validator');
const yargs = require('yargs');
const task = require('./task');
const chalk = require('chalk');


yargs.version('5.5.0');

yargs.command({
  command: 'remove',
  describe: 'remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    let result = task.removeTask(argv.title);
    result ? console.log("Title: " + argv.title) : console.log(chalk.bgRedBright.yellow.bold("Sorry the note not exists"))
  }
  //handler: () => console.log("Remove a note")
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: () => console.log("Read a note")
});

yargs.command({
  command: 'list',
  describe: 'List notes',
  handler: () => {
    let taskTitles = task.listTasks();
    for (let i = 0; i < taskTitles.length; i++ ) {
        console.log(chalk.bold.white(taskTitles[i]));
    }
  }
});

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    let taskObj = {
      Title: argv.title,
      Body: argv.body
    };
    task.saveTaskIntoFile(taskObj.Title, taskObj);
    console.log("Title: " + argv.title + "\nBody: " + argv.body)
  }
});
yargs.parse();


/*switch (command) {
  case 'add':
    console.log(chalk.bgBlueBright.whiteBright(command));
    break;
  case 'remove':
    console.log(chalk.bgBlueBright.whiteBright(command));
    break;
  default:
    console.log(chalk.bgRed.yellow.bold('Error, no command..'))
}*/



