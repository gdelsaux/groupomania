const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require("cors");

const app = express();

app.use(cors());

//routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Form-data');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

//set .env
require('dotenv').config();

//distribute build folder
// declare react files in build as static
app.use(express.static(path.join(__dirname, "build")));

// serve index.html from the build folder
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(fileUpload());

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);
app.use('/like', likeRoutes);

console.log(process.env.DB_password)

module.exports = app; 