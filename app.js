require('./db');
require('./auth');

const express = require('express');
//const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const User = mongoose.model('User');

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'some secret',
    resave: true,
    saveUninitialized: false // ?
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// initialize passport and enable sessions
app.use(passport.initialize());
app.use(passport.session());

// const index = require('./routes/index');
// app.use('/', index);

app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});

app.set('views', path.join(__dirname, "views"));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', function(req,res,next) {
    passport.authenticate('local', function(err,user) {
        if(user) {
            req.logIn(user, function(err) {
                res.redirect('/');
            });
        } else {
            res.render('login', {message:'Your login or password is incorrect.'});
        }
    })(req, res, next);
});

app.get('/register', function(req, res) {
  res.render('register');
});

app.post('/register', function(req, res) {
    User.register(new User({username: req.body.username}), 
        req.body.password, function(err, user){
        if (err) {
            res.render('register', {message:'Your registration information is not valid'});
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/');
            });
        }
    });   
});

app.listen(3000);
