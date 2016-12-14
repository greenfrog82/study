/* jshint -W097 */
/*jslint node: true */
'use strict';

import {Document} from 'camo';

export class Movie extends Document {
    constructor() {
        super();

        // 스키마 정의 방법 1.
        // this.title = String;
        // this.rating = {
        //     type: String,
        //     choices: ['15', '19', 'ALL']
        // };
        // this.releaseDate = Date;
        // this.hasCreditCookie = Boolean;

        // 스키마 정의 방법 2.
        this.schema({
          title: String,
          rating: {
            type: String,
            choices: ['15', '19', 'ALL']
          },
          releaseDate: Date,
          hasCreditCookie: Boolean
        });
    }

    static collectionName() {
        return 'movies';
    }
}
