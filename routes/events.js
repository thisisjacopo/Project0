const express  = require('express');
const Event = require('../models/event');
const router = express.Router();

//CHECK IF USER IS LOGGED IN, IF NOT RENDERS TO LOGIN PAGE

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect('/auth/login');
});

//RENDERS ALL EVENTS ON EVENTS-ALL PAGE, HAD TO BE PUT ABOVE NEW EVENT OR IT WOULDN´T RENDER LIST
router.get('/events-all', async (req, res, next) => {
  const events = await Event.find();
  res.render('events/events-all', {events});
  });



// SENDS YOU TO NEW EVENT FROM PROFILE PAGE AND FROM 'As'
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



//IMPORTANT!
module.exports = router;