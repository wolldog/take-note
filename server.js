const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

//Include 'static' route
app.use(express.static(path.join(__dirname, 'public')));

// Route for notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//Listen  
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`))