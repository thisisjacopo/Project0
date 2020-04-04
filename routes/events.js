const express = require("express");
const Event = require("../models/event");
const User = require("../models/user");
const router = express.Router();
const Handlebars = require('hbs')

//CHECK IF USER IS LOGGED IN, IF NOT RENDERS TO LOGIN PAGE

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect("/auth/login");
});

//RENDERS ALL EVENTS ON EVENTS-ALL PAGE, HAD TO BE PUT ABOVE NEW EVENT OR IT WOULDN´T RENDER LIST
router.get("/events-all", async (req, res, next) => {
  const events = await Event.find();
  res.render("events/events-all", { events });
});

// SENDS YOU TO NEW EVENT FROM PROFILE PAGE AND FROM 'As'

router.get("/new-event", (req, res, next) => {
  res.render("events/new-event");
});

//CREATES NEW EVENT AND REDIRECT USER TO EVENTS-ALL PAGE

router.get("/events-all", (req, res, next) => {
  if (req.session.currentUser) {
    req.session.currentUser._id = Event.host;
    res.locals.isUserHost = true;
  } else {
    res.locals.isUserHost = false;
  }
  
  res.render("events/events-all");
});

router.post("/new-event", (req, res, next) => {
  const host = req.session.currentUser._id;
  const { title, location, date, time } = req.body;
  const newEvent = new Event({ title, location, date, time, host });
  newEvent
    .save()
    .then(() => {
      res.redirect("events-all");
    })
    .catch(error => {
      console.log("Error while adding event", error);
    });
});


// Handlebars.registerHelper('isdefined', function (host) {
//   return host !== req.session.currentUser._id;
// });

//CHECK IF USER IS HOST AND SEND IT TO HBS

// Handlebars.registerHelper("ifEquals", function(host, creator, options) {
//   return host === host ? options.fn(show) : options.inverse(noShow);
// });

//ID ROUTES START HERE

//DELETE EVENT

router.post("/:id/delete", (req, res, next) => {
  Event.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/events/events-all");
    })
    .catch(e => next(e));
});
router.get("/:id", (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => {
      res.render("events/events-all", event);
    })
    .catch(error => {
      console.log("Error while getting the event from DB: ", error);
    });
});

//EDIT EVENT

router.get("/:id/edit", async (req, res, next) => {
  const editEvent = await Event.findById(req.params.id);
  res.render("events/edit", editEvent);
});

router.post("/:id/edit", async (req, res, next) => {
  const { title, location, date, time } = req.body;
  await Event.update(
    { _id: req.body.id },
    { $set: { title, location, date, time } }
  );
  res.redirect("/events/events-all");
});

//IMPORTANT!
module.exports = router;
