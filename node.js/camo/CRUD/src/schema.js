/* jshint -W097 */
/*jslint node: true */
'use strict';

const Document = require('camo').Document;

//module.exports = class Movie extends Document {
// Using anonymous class ..
exports.Movie = class extends Document {
    constructor() {
        super();

        this.title = String;
        this.rating = {
            type: String,
            choices: ['15', '19', 'ALL']
        };
        this.releaseDate = Date;
        this.hasCreditCookie = Boolean;
    }

    static collectionName() {
        return 'movies';
    }
};
