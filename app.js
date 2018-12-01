require('./db');
require('./auth');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const User = mongoose.model('User');
const Trip = mongoose.model('Trip');

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'some secret',
    resave: true,
    saveUninitialized: false
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// log request path and method
app.use((req,res,next) =>{
    console.log(req.method, req.path);
    console.log(res.statusCode);
    // console.log('req.query: ', req.query);
    // console.log('req.body: ', req.body, '\n');
	next();
});

// initialize passport and enable sessions
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

app.set('views', path.join(__dirname, "views"));

app.get('/', (req, res) => {
    if(req.user) {
        let context = null;
        // if query, filter by query
        if(req.query.place && req.query.place !== '') {
            // filter planned trips
            const filteredPlanned = req.user.planned.filter((ele) => ele.place.toLowerCase().includes(req.query.place.toLowerCase()));
            const filteredCompleted = req.user.completed.filter((ele) => ele.place.toLowerCase().includes(req.query.place.toLowerCase()));
            context = {planned: filteredPlanned, completed: filteredCompleted, query: req.query.place};
        } else { // otherwise use whole list
            context = {planned: req.user.planned, completed: req.user.completed};
        }
        res.render('index', context);
    } else {
        // if no user, context not needed
        res.render('index');
    }
});

app.get('/list', (req, res) => {
    if(req.user){
        if(req.query.type === 'planned'){
            res.render('list', {list: req.user.planned});
        } else if(req.query.type === 'completed'){
            res.render('list', {list: req.user.completed});
        } else {
            res.render('/');
        }
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

// based off of authentication slides
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

// based off of authentication slides
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

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/add', (req, res) => {
    if(req.user){
        res.render('add');
    } else {
        // console.log('redirect to login');
        res.redirect('/login');
    }
});

app.post('/add', (req, res) => {
    // console.log(req.body);
    User.findOne({username: req.user.username}, (err,user) => {
        new Trip({
            user: user, 
            place: req.body.place,
            created: Date.now(),
            desc: req.body.desc
        }).save((err, trip) => {
            if(req.body.tripType === 'planned') {
                user.planned.unshift(trip);
            } else if (req.body.tripType === 'completed') {
                user.completed.unshift(trip);
            }
            
            user.save((err, saved) =>{
                // console.log("saved user");
                // console.log('user.planned', user.planned)
                res.redirect('/');
            });
        });
    });
});

app.get('/account', (req, res) => {
    if(req.user){
        res.render('account');
    } else {
        res.redirect('/login');
    }
});

app.post('/account', (req, res) => {
    User.findOne({username: req.user.username}, (err,user) => {
        user.bio = req.body.bio;
        user.save((err, saved) =>{
            res.redirect('/account');  
        });
    });
});

app.listen(process.env.PORT || 3000);
