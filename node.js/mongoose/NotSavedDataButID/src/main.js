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

const cars = new CarCollection({
  model: 'NIRO',
  users: [
    {name: 'greenfrog', age: 35},
    {name: 'bluebird', age: 500}
  ]
});

new Promise((resolve, reject) => {
  cars.save((err, savedCar) => {
    if(err) {
      reject(err);
    } else {
      resolve(savedCar);
    }
  });
})
.then(resolve, reject);

function resolve(savedCar) {
  console.log('saved successfully :', savedCar);

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
}

function reject(err) {
  console.err(err);
}
