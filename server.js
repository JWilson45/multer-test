var express = require('express');

// Multer Definition
const multer = require('multer');
const upload_dest = multer({dest:'uploads/'}); // set the upload directory

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('hello people');
});

app.post('/single', upload_dest.single('profile'), (req, res) => {
  try {
    res.send(req.file);
    console.log('A File Was Uploaded')
    console.log(req.file)
  }catch(err) {
    res.send(400);
  }
});

app.listen(port, () => {
    console.log('listening to the port: ' + port);
});
