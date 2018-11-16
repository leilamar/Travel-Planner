const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// a plan
// * must have a related user
// * place: info about where you want to go
// * date: date the plan was created
// * desc: description of the place and what you want to do there
const Trip = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}, // needed?
  place: {type: String, required: true},
  created: {type: Date, required: true},
  desc: {type: String, required: false}
});

// users
// * our site requires authentication...
// * so users have a username and password
// * have a list of planned trips and a list of completed trips
const User = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  planned: [Trip],
  completed: [Trip],
  bio: {type: String, required: false}
});

User.plugin(passportLocalMongoose);
mongoose.model('User', User);
mongoose.model('Trip', Trip);

mongoose.connect('mongodb://localhost/ait-final-proj');