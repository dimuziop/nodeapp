let validator = require('validator');
const yargs = require('yargs');
const task = require('./task');


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
    task.removeTask(argv.title);
    console.log("Title: " + argv.title)
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
  handler: () => console.log(task.listTasks())
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



