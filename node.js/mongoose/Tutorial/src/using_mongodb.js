
//lets require/import the mongodb native drivers.
import mongodb from 'mongodb';

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
const MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
const url = 'mongodb://localhost:27017/mongodb_tutorial';

//insert();
//update();
//select();
curosr();

function insert() {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);

      // Get the documents collection
      const collection = db.collection('users');

      //Create some users
      const user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
      const user2 = {name: 'modulus user', age: 22, roles: ['user']};
      const user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

      // Insert some users
      collection.insert([user1, user2, user3], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
        }
        //Close connection
        db.close();
      });
    }
  });
}

function update() {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);

      // do some work here with the database.

      var collection = db.collection('users');

      // Insert some users
      collection.update({name: 'modulus user'}, {$set: {enabled: false}}, function (err, numUpdated) {
        if (err) {
          console.log(err);
        } else if (numUpdated) {
          console.log('Updated Successfully %d document(s).', numUpdated);
        } else {
          console.log('No document found with defined "find" criteria!');
        }
        //Close connection
        db.close();
      });
    }
  });
}

function select() {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);
      // Get the documents collection
      var collection = db.collection('users');

      // Insert some users
      collection.find({name: 'modulus user'}).toArray(function (err, result) {
        if (err) {
          console.log(err);
        } else if (result.length) {
          console.log('Found:', result);
        } else {
          console.log('No document(s) found with defined "find" criteria!');
        }
        //Close connection
        db.close();
      });
    }
  });
}

function curosr() {
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);

      // Get the documents collection
      var collection = db.collection('users');

      //We have a cursor now with our find criteria
      var cursor = collection.find({});

      //We need to sort by age descending
      cursor.sort({age: -1});

      //Limit to max 10 records
      cursor.limit(1);

      //Skip specified records. 0 for skipping 0 records.
      cursor.skip(1);

      //Lets iterate on the result
      cursor.each(function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          console.log('Fetched:', doc);
        }
      });
    }
  });
}
