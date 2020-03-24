const mongoose = require("mongoose");
const express  = require('express');
const router = express.Router();
const Event = require('../models/Event');


//SENDS YOU TO NEW EVENT FROM PROFILE PAGE
//SENDS TO NEW EVENT PAGE
// router.get('/events/new-event', (req, res, next) => {
//     res.render('events/new-event');
// });


//CREATES NEW EVENT
router.get('/new-event', (req, res, next) => {
res.render('events/new-event');
});

router.post('/members/events/new-event', (req, res, next) => {
    const { title, location, date, time } = req.body;
    const newEvent = new Event({ title, location, date, time })
    newEvent.save()
    .then(() => {
      res.redirect('events/events-all')
    })
    .catch((error) => {
      console.log('Error while adding event', error)
    });
  });


//IMPORTANT!
module.exports = router;