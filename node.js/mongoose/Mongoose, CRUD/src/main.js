import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

import {GroupsModel} from './schema';

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // ...
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/groups', (req, res) => {
  const query = JSON.parse(req.query.query);
  const projection = (req.query.projection)? JSON.parse(req.query.projection): undefined;

  // GroupsModel.find({'groups.name': 'Front-End'}, {'groups.$': 1}, (err, groups) => {
  GroupsModel.find(query, projection, (err, groups) => {
  // GroupsModel.findOne(query, projection, (err, groups) => {
    if(err) {
      return res.send(err);
    }
    res.send(groups);
  });
});

app.get('/itemInGroups', (req, res) => {
  const query = JSON.parse(req.query.query);
  const projection = (req.query.projection)? JSON.parse(req.query.projection): undefined;

  // GroupsModel.find({'groups.name': 'Front-End'}, {'groups.$': 1}, (err, groups) => {
  GroupsModel.findOne(query, projection, (err, group) => {
  // GroupsModel.findOne(query, projection, (err, groups) => {
    if(err) {
      return res.send(err);
    } else if(group) {
      res.send(group);
    } else {
      res.send('There is no group!!');
    }
  });
});

app.get('/itemUsingId', (req, res) => {
  GroupsModel.findById(req.query.id, (err, group) => {
    if(err) {
      return res.send(err);
    } else if(group) {
      res.send(group);
    } else {
      res.send('There is no group!!');
    }
  });
});

app.post('/groups', (req, res) => {
  console.log(`[${req.method}] ${req.url}`);
  console.log(`[req.body] `, req.body);
  new GroupsModel(req.body).save((err, createdGroups) => {
    if(err) {
      return res.send(err);
    }
    res.send(createdGroups);
  });
});

app.put('/groups', (req, res) => {
  GroupsModel.findById(req.body.id, (err, group) => {
    if(err) {
      res.status(500).send(err);
    } else {
      console.log('group > ', group);
      console.log('req.body.name > ', req.body.groups);
      group.groups = req.body.groups;

      console.log('group > ', group);

      group.save((err, savedGroup) => {
        if(err) {
          res.status(500).send(err);
        } else {
          res.send(savedGroup);
        }
      });
    }
  });
});

app.delete('/groups', (req, res) => {
  GroupsModel.findByIdAndRemove(req.body.id, (err, group) => {
    if(err) {
      res.status(500).send(err);
    } else {
      res.send(`${req.body.id} is successfully deleted.`);
    }
  });
});

app.listen(3000, () => {
  console.log('MongoDB CRUD Test Server on PORT 3000 ...!!');
});
