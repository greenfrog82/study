//Lets load the mongoose module in our program
import mongoose from 'mongoose';

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/mongodb_tutorial');

/**
 * Lets define our Model for User entity. This model represents a collection in the database.
 * We define the possible schema of User document and data types of each field.
 * */
var User = mongoose.model('User', {name: String, roles: Array, age: Number});

/**
 * Lets Use our Models
 * */

//Lets create a new user
// var user1 = new User({name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']});
//
// //Some modifications in user object
// user1.name = user1.name.toUpperCase();
//
// //Lets try to print and see it. You will see _id is assigned.
// console.log(user1);
//
// //Lets save it
// user1.save(function (err, userObj) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('saved successfully:', userObj);
//   }
// });

//Lets try to Find a user
User.findOne({name: 'MODULUS ADMIN'}, function (err, userObj) {
  if (err) {
    console.log(err);
  } else if (userObj) {
    console.log('Found:', userObj);

    //For demo purposes lets update the user on condition.
    if (userObj.age != 30) {
      //Some demo manipulation
      userObj.age += 30;

      //Lets save it
      userObj.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Updated', userObj);
        }
      });
    }
  } else {
    console.log('User not found!');
  }
});

// User.findOne({name: 'modulus admin'}, (err, userObj) => {
//   console.log('test');
//   if(err) {
//     console.log(err);
//   } else if(userObj) {
//     console.log('Found:', userObj);
//
//     userObj.age = (userObj.age === 30)? userObj.age: userObj.age + 30;
//
//     userObj.save((err) => {
//       if(err) {
//         console.log(err);
//       } else {
//         console.log('Updated', userObj);
//       }
//     });
//   } else {
//     console.log('User not found!');
//   }
// });
