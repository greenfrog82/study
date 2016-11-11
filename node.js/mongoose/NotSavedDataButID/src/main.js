import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test_duplicate_data');

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  age: Number
});

const Car = new Schema({
  model: String,
  users: [User]
});

const History = new Schema({
  year: String,
  users: [User]
});

const CarCollection = mongoose.model('Car', Car);
const HistoryCollection = mongoose.model('History', History);

CarCollection.find({}, (err, car) => {
  if(err) {
    console.err(err);
  } else {
    try {
      console.log('car', car);
      console.log('car.model', car[0].model);
      console.log('car.users', car[0].users);
      const history = new HistoryCollection({
        year: 2015,
        users: car[0].users
      });

      history.save((err, savedHistory) => {
        if(err) {
          console.err(err);
        } else {
          console.log('saved successfully :', savedHistory);
        }
      });
      console.log(history);
    } catch (e) {
      console.err(e);
    } finally {

    }

  }
});

// const cars = new CarCollection({
//   model: 'NIRO',
//   users: [
//     {name: 'greenfrog', age: 35},
//     {name: 'bluebird', age: 500}
//   ]
// });
//
// cars.save((err, savedCar) => {
//   if(err) {
//     console.err(err);
//   } else {
//     console.log('saved successfully :', savedCar);
//   }
// });

// Lets create 'User' document.
// var user1 = new User({name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']});
//
// // Lets save it
// user1.save(function (err, userObj) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('saved successfully:', userObj);
//   }
// });
//
// // Lets update value of 'roles' key in the 'User' document.
// User.findOne({name: 'modulus admin'}, function (err, userObj) {
//   if (err) {
//     console.log(err);
//   } else if (userObj) {
//     console.log('Found:', userObj);
//
//     // userObj.roles[0] = 'Administrator';
//     userObj.roles.set(0, 'Administrator');
//     userObj.save(function (err, savedUserObj) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Updated', savedUserObj);
//       }
//     });
//   } else {
//     console.log('User not found!');
//   }
// });
