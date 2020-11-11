var express = require('express');
// Multer Definition
const multer = require('multer');
const app = express();
const port = 3000;

// Define Storage in Filesystem and Naming Convention
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage}); // set upload to storage for more control

app.get('/', (req, res) => {
    res.send('Hello World\n\nPOST files to /single');
});

app.post('/single', upload.single('profile'), (req, res) => {
  try {
    res.send(req.file);
    console.log('A File Was Uploaded')
    console.log(req.file)
  }catch(err) {
    res.send(400);
  }
});

app.post('/array', upload.array('profile', 10), (req, res) => {
  try {
    res.send(req.files);
    console.log('Files Have Been Uploaded')
    console.log(req.files);
  }catch(err) {
    res.send(400);
  }
});

app.listen(port, () => {
    console.log('listening to the port: ' + port);
});
