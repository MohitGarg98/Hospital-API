const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('./config/passport');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const expressLayouts = require('express-ejs-layouts');
const flash = require("connect-flash");


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.failure_msg = req.flash('failure_msg');
  next();
});

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/hospitaldb", {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

app.use('/', require('./routes'));

app.listen(8000, function (err) {
    if(err){console.log(err); return}
    else{
        console.log('Server runnning on port 8000');
    }
})