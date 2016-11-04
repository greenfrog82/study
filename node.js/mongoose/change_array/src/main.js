import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/mongodb_tutorial');

const User = mongoose.model('User', {name: String, roles: Array, age: Number});

// Lets create 'User' document.
var user1 = new User({name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']});

// Lets save it
user1.save(function (err, userObj) {
  if (err) {
    console.log(err);
  } else {
    console.log('saved successfully:', userObj);
  }
});

// Lets update value of 'roles' key in the 'User' document.
User.findOne({name: 'modulus admin'}, function (err, userObj) {
  if (err) {
    console.log(err);
  } else if (userObj) {
    console.log('Found:', userObj);

    // userObj.roles[0] = 'Administrator';
    userObj.roles.set(0, 'Administrator');
    userObj.save(function (err, savedUserObj) {
      if (err) {
        console.log(err);
      } else {
        console.log('Updated', savedUserObj);
      }
    });
  } else {
    console.log('User not found!');
  }
});
