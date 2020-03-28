var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//GET ABOUT VIEW
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});


  //RENDERS MEMBERS CITIES TO CITIES
  router.get('/cities', async (req, res, next) => {
    const users = await User.find();
        res.render('cities', {users});
  });

module.exports = router;