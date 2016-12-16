/* jshint -W097 */
/*jslint node: true */
'use strict';

const Document = require('camo').Document;
const EmbeddedDocument = require('camo').EmbeddedDocument;

class _User extends Document {
  constructor() {
    super();
    this.schema({
      key: String
    });
  }

  static collectionName() {
    return 'users';
  }
}

class _Filter extends Document {
  constructor() {
    super();
    this.schema({
      isUse: {type:Boolean, default:false},
      users: [_User]
    });
  }

  static collectionName() {
    return 'filters';
  }
}

exports.User = _User;
exports.Filter = _Filter;
