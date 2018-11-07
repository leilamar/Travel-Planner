// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// users
// * our site requires authentication...
// * so users have a username and password
// * have a list of planned trips and a list of completed trips
const User = new mongoose.Schema({
  // username provided by authentication plugin
  // password hash provided by authentication plugin
  planned: [Trip],
  completed: [Trip]
});

// a plan
// * must have a related user
// * place: info about where you want to go
// * date: date the plan was created
// * desc: description of the place and what you want to do there
const Trip = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  place: {type: String, required: true},
  created: {type: Date, required: true},
  desc: {type: String, required: false},
});