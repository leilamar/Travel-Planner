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
const Trip = mongoose.model('Trip');

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

// log request path and method
app.use((req,res,next) =>{
    console.log(req.method, req.path);
    console.log(res.statusCode);
    console.log('req.query: ', req.query);
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

app.get('/test', (req, res) => {
    if(req.query.type === 'planned'){
        res.render('list', {list: req.user.planned});
    } else if(req.query.type === 'completed'){
        res.render('list', {list: req.user.completed});
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
            created: Date.now(), // how to get current time?
            desc: req.body.desc
        }).save((err, trip) => {
            // console.log('saved trip');
            // console.log('user', user);
            // console.log('user.planned', user.planned);
            // console.log('user.completed', user.completed);
            // console.log('req.body.tripType', req.body.tripType);

            if(req.body.tripType === 'planned') {
                // console.log('planned');
                user.planned.unshift(trip);
            } else if (req.body.tripType === 'completed') {
                // console.log('completed');
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

app.get('/list', (req, res) => {
    if(req.user){
        res.render('list', {list: req.user.planned})
    } else {
        res.redirect('/login');
    }
});

app.use(function(req, res) {
    res.status(404).send('404: Page not Found');
});

app.listen(process.env.PORT || 3000);
