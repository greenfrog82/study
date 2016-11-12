import mongoose from 'mongoose';
import bluebird from 'bluebird';

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  const kittySchema = mongoose.Schema({
    name: String
  });
  kittySchema.methods.speak = function() {
    const greeting = this.name? `Meow name is ${this.name}`: "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model('Kitten', kittySchema);

  const silence = new Kitten({name: 'Silence'});
  console.log(silence.name);

  const fluffy = new Kitten({name: 'fluffy'});
  fluffy.speak();

  fluffy.save((err, fluffy) => {
    if(err) return console.error(err);
    fluffy.speak();
  })
  .then(() => {
    Kitten.find((err, kittens) => {
     if(err) return console.error(err);
     console.log(kittens);
    })
    .then(() => {
      Kitten.find({name: /^fluffy/}, (err, kittens) => {
       if(err) return console.error(err);
       console.log(kittens);
     });
    });
  });
});
