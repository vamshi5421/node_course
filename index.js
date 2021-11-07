const express = require('express');
const path = require('path');
const app = express();
const route = require('./routes/home');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use(route);

app.use((req, res) => {
  return res.send('<h1>404 not found</h1>');
});

mongoose
  .connect('mongodb://localhost:27017/person')
  .then(() => {
    console.log('connectedd to db');
    app.listen(3000, () => {
      console.log('express server started');
    });
  })
  .catch(() => {
    console.log('could not connect to db');
  });
