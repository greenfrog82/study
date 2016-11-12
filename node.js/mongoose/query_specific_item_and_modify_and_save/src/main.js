import mongoose from 'mongoose';
import bluebird from 'bluebird';
import {GroupsModel} from './schema';

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/test');

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  age: Number
});

const UserModel = mongoose.model(
  'User',
  User
);

initDB();

function initDB() {
  UserModel.find({}, (err, groups) => {
    if(err) {
      console.log('initDB > err >', err);
    } else if(!groups) {
      groups = new UserModel();
      console.log('initDB > !groups >', groups);
      groups.save((err, savedGroups) => {
        if(err) {
          console.log('initDB > save > err >', err);
        } else {
          console.log('initDB > save > savedGroups >', savedGroups);
        }
      });
    } else {
      console.log('initDB > There is groups >', groups);
      groups.save((err) => {
        if(err) {
          cosnole.log('save err', err);
        } else {
          console.log('save successfully');
        }
      });
    }
  });
}

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
