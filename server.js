var express = require('express');
const multer = require('multer'); // Multer Definition
const app = express();
const port = 6969;
const path = require('path')

/*
 *   Ensure the filesystem is created in the project directory
 *   using the fs module. If the directory is created, ignore,
 *   otherwise, create the storage directories
*/
var fs = require('fs'); // Filesystem createion using fs
const defaultFS = './uploads';

// Definition of file storage system
const storagePath = [
  defaultFS,
  defaultFS + '/resources',
  defaultFS + '/resources/media',
  defaultFS + '/resources/text',
  defaultFS + '/profile_pictures'
];

for (const i of storagePath) {
  if (!fs.existsSync(i)) {
    fs.mkdirSync(i);
  }
}


// Define Storage in Filesystem and Naming Convention
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , path.basename(
          file.originalname,path.extname(file.originalname))
        + '-'
        + new Date().toISOString()
        + path.extname(file.originalname));
    }
});

const upload = multer({
  storage: storage
  // limits: {filesize: 1000} limits the filesize
}); // set upload to storage for more control

app.get('/', (req, res) => {
    res.send('Hello World<br><br>POST files to /single');
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
