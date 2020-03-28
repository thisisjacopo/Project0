const express = require('express');
const User = require('../models/user');
const router = express.Router();

//CHECK IF USER IS LOGGED IN, IF NOT RENDERS TO LOGIN PAGE

router.use((req, res, next) => {
    if (req.session.currentUser) {
      next();
      return;
    }
    res.redirect('/auth/login');
  });

  //RENDERS MEMBERS CITIES TO CITIES
router.get('/', async (req, res, next) => {
  const users = await User.find();
      res.render('cities', {users});

  // .catch (error => {
  //     console.log('Error while getting the users from DB: ', error);
  // });
});


//SENDS TO COMUNITY PAGE, RENDERS ALL MEMBERS

router.get('/comunity', async (req, res, next) => {
  const users = await User.find();
      res.render('members/comunity', {users});
  // .catch (error => {
  //     console.log('Error while getting the users from DB: ', error);
  // });
});

// // //SENDS YOU TO NEW EVENT FROM PROFILE PAGE
// // //SENDS TO NEW EVENT PAGE

router.get('/events', (req, res, next) => {
  res.render('events/new-event');
});


//IDS GO AFTER STATIC ROUTES
//TO PROFILE PAGE

    router.get('/:id', (req, res, next) => {
        const userId = req.params.id;
        
      User.findById(userId, (err, theUser) => {
        if (err) {
          next(err);
          return;
        }
    
        res.render('members/user-profile', {
          theUser: theUser
        });
      });
    });
    
    module.exports = router;