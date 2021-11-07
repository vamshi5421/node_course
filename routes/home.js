const express = require('express');
const path = require('path');
const Person = require('../data/Person');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/done', (req, res) => {
  Person.find().then((doc) => {
    res.render('done', {
      parr: doc,
    });
  });
});

router.post('/save', (req, res) => {
  Person.findOne({ email: req.body.email })
    .then((doc) => {
      if (doc) {
        console.log(doc);

        res.send('Email id in use');
        return;
      }
      if (req.body.password == req.body.cpassword) {
        const person = new Person({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        return person.save();
      } else {
        res.send('Passwords doesnt match');
      }
    })
    .then((savedDoc) => {
      return res.redirect('/done');
    })
    .catch((e) => {
      res.redirect('/500');
    });
});

router.get('/500', (req, res) => {
  res.render('Error');
});

module.exports = router;
