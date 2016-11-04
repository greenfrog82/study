//Lets load the mongoose module in our program
import mongoose from 'mongoose';

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/mongodb_tutorial');

/**
 * Lets define our Model for User entity. This model represents a collection in the database.
 * We define the possible schema of User document and data types of each field.
 * */
const User = mongoose.model('User', {name: String, roles: Array, age: Number});

//insert();
// select();
// updateArrayItem();
deleteAllDocuments();

/**
 * Lets Use our Models
 * */
function insert() {
  const user1 = new User({name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']});

  //Some modifications in user object
  user1.name = user1.name.toUpperCase();

  //Lets try to print and see it. You will see _id is assigned.
  console.log(user1);

  //Lets save it
  user1.save(function (err, userObj) {
    if (err) {
      console.log(err);
    } else {
      console.log('saved successfully:', userObj);
    }
  });
}

function updateArrayItem() {
  //Lets try to Find a user
  User.findOne({name: 'MODULUS ADMIN'}, function (err, userObj) {
    if (err) {
      console.log(err);
    } else if (userObj) {
      console.log('Found:', userObj);

      userObj.roles.set(targetIdx, 'Administrator');
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
}

function deleteAllDocuments() {
  User.remove({}, (err, result) => {
    if(err) {
      console.log(err);
    } else {
      console.log('delted successfully:', result);
    }
  })
}
