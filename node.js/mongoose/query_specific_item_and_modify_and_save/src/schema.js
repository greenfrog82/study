import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const User = new Schema({
  name: String,
  age: Number
});

export const Group = new Schema({
  name: String,
  users: [User]
});

export const GroupsModel = mongoose.model(
  'Groups',
  { groups: [Group] }
);
