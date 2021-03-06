require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const nodemon = require("nodemon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

mongoose
  .connect("mongodb://localhost/Project0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to mongo Database : ${x.connections[0].name}`);
  })
  .catch((err) => {
    console.log("Error while connecting to mongo :", err);
  });

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const authRoutes = require("./routes/auth");
const membersRoutes = require("./routes/members");
const eventsRoutes = require("./routes/events");
const app = express();

//Views Engine Setups

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

//SESSION SETUP AND CURRENT USER

app.use(
  session({
    secret: "more blue, less plastic",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60, // 1 day
    }),
  })
);

app.use((req, res, next) => {
  if (req.session.currentUser) {
    res.locals.currentUserInfo = req.session.currentUser;
    res.locals.isUserLoggedIn = true;
  } else {
    res.locals.isUserLoggedIn = false;
  }
  next();
});

//Middleware Setups

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/auth", authRoutes);
app.use("/members", membersRoutes);
app.use("/events", eventsRoutes);
app.set("partials", path.join(__dirname, "views/partials"));

// catches 404 and forward to error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
