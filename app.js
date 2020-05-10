const chalk= require('chalk')
const yargs= require('yargs')
const notes= require('./notes.js');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title:{
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body:{
      describe: 'Body',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    notes.addNote(argv.title, argv.body);
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    notes.removeNote(argv.title);
  }
})

yargs.command({
  command: 'list',
  describe: 'Lists all notes',
  handler(){
    notes.listNotes();
  }
})

yargs.command({
  command: 'read',
  describe: 'Reads note body',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: "string"
    }
  },
  handler(argv){
    notes.readNote(argv.title);
  }
})

yargs.parse();
