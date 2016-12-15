/* jshint -W097 */
/*jslint node: true */
'use strict';

const Document = require('camo').Document;
const EmbeddedDocument = require('camo').EmbeddedDocument;

class _User extends EmbeddedDocument {
// class _User extends Document {
  constructor() {
    super();
    this.schema({
      name: String,
      age: Number
    });
  }

  static collectionName() {
    return 'user';
  }
}

class _Game extends Document {
    constructor() {
      super();
      this.schema({
        title: String,
        user: _User
      });
    }

    static collectionName() {
      return 'game';
    }
}

exports.User = _User;
exports.Game = _Game;
