const mongoose = require("mongoose");
const express  = require('express');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/Event');


// SENDS YOU TO NEW EVENT FROM PROFILE PAGE
// SENDS TO NEW EVENT PAGE
router.get('/new-event', (req, res, next) => {
    res.render('events/new-event');
});


//CREATES NEW EVENT AND REDIRECT USER TO EVENTS-ALL PAGE
router.get('/events-all', (req, res, next) => {
res.render('events/events-all');
});

router.post('/new-event', (req, res, next) => {
    const { title, location, date, time } = req.body;
    const newEvent = new Event({ title, location, date, time });
    newEvent.save()
    .then(() => {
      res.redirect('events-all');
    })
    .catch((error) => {
      console.log('Error while adding event', error);
    });
  });


//RENDERS ALL EVENTS ON EVENTS-ALL PAGE
router.get('/', (req, res, next) => {
    Event.find()
    .then(events => {
        res.render('events/events-all', {events: events});
    })
    .catch (error => {
        console.log('Error while getting the events from DB: ', error);
    });
});

//IMPORTANT!
module.exports = router;