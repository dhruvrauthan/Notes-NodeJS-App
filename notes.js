const fs= require('fs');
const chalk= require('chalk');

const addNote= (title, body) => {
    const notes= loadNotes();
    const duplicateNotes= notes.filter((note) => note.title=== title)

    if(duplicateNotes.length==0){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);
        console.log(chalk.green('Note added!'));
    } else{
        console.log(chalk.red('Note title already exists!'));
    }
}

const saveNotes= (notes) => {
    const dataJSON= JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes= () => {
    try{
        const dataBuffer= fs.readFileSync('notes.json');
        const dataJSON= dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return [];
    }
}

const removeNote= (title) => {
    const notes= loadNotes();
    const notesToKeep= notes.filter((note) => note.title!== title)

    if(notes.length>notesToKeep.length){
        saveNotes(notesToKeep);
        console.log(chalk.green('Note was removed'));
    } else{
        console.log(chalk.red('No such note found'));
    }
}

const listNotes= () => {
    const notes= loadNotes();
    console.log(chalk.blue('Your notes...'));
    notes.forEach((note) => {
        console.log('Title: '+note.title+"\t"+"Body: "+note.body);
    });
}

const readNote= (title) => {
    const notes= loadNotes();
    const duplicateNote= notes.find((note) => note.title=== title);

    if(duplicateNote){
        console.log('Body: '+duplicateNote.body);
    } else{
        console.log(chalk.red('No note found!'));
    }
}

module.exports= {
    addNote: addNote,
    removeNote: removeNote,
    loadNotes: loadNotes,
    listNotes: listNotes,
    readNote: readNote
};
