const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('./helpers/fsUtils');


const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Include 'static' route
app.use(express.static(path.join(__dirname, 'public')));

// Route for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//Routes for api/notes
// GET route to retreive all notes from db.json
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// POST Route for a new note with unique id
app.post('/api/notes', (req, res) => {
  const {title, text} = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };
    // readAndAppend (see fsUtils) reads and appends db.json with new notes
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

//Listen  
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`))