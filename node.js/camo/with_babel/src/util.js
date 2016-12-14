/* jshint -W097 */
/*jslint node: true */
'use strict';

import {Movie} from './schema';

// Create
export function create(movie) {
  Movie.create(movie).save().then(
    savedRes => {
      console.log(`[CREATE] Success to save successfully. ${JSON.stringify(savedRes)}`);
    }).catch(err => {
      console.log(`[CREATE] ERROR HANDLER : ${err}`);
    });
}

// Read by title
export function readByTitle(title) {
  Movie.findOne({title: title}).then(
    foundMovie => {
      if(foundMovie) {
        console.log(`[READ BY TITLE] Success to read by ${foundMovie.title}. ${JSON.stringify(foundMovie)}`);
      } else {
        console.log(`[READ BY TITLE] There is no movie which you find.`);
      }
    }).catch(err => {
      console.log('[READ BY TITLE] ERROR HANDLER : ', err);
    });
}

// Read all
export function readAll() {
  Movie.find({}).then(
    foundMovies => {
      console.log('[READ ALL] Success to read all.');

      if(0 < foundMovies.length) {
        foundMovies.forEach(movie => {
          console.log(movie);
        });
      } else {
        console.log('[READ ALL] There are no movies.');
      }
    }).catch(err => {
      console.log('[READ ALL] ERROR HANDLER : ', err);
    });
}

// Read all by title
export function readAllByTitle(title) {
  Movie.find({title: title}).then(
    foundMovies => {
      console.log('[READ ALL BY TITLE] Success to read all.');

      if(0 < foundMovies) {
        foundMovies.forEach(movie => {
          console.log(movie);
        });
      } else {
        console.log('[READ ALL BY TITLE] There are no movies');
      }
    }).catch(err => {
      console.log('[READ ALL BY TITLE] ERROR HANDLER : ', err);
    });
}

// Update
export function updateByTitle(title, rating) {
  Movie.findOneAndUpdate({title: title}, {rating: rating}).then(
    foundMovie => {
      if(foundMovie) {
        console.log(`[UPDATE BY TITLE] Success to find and update by ${foundMovie.title}. ${JSON.stringify(foundMovie)}`);
      } else {
        console.log('[UPDATE BY TITLE] There is no movie.');
      }
    }).catch(err => {
      console.log('[UPDATE BY TITLE] ERROR HANDLER : ', err);
    });
}

// Delete by title
export function deleteByTitle(title) {
  Movie.deleteOne({title:title}).then(
    count => {
      console.log(`[DELETE BY TITLE] Success to delete by title. ${count}`);
    }).catch(err => {
      console.log('[DELETE BY TITLE] ERROR HANDLER : ', err);
    });
}

// Delete all
export function deleteAll() {
  Movie.deleteMany({}).then(
    count => {
      console.log(`[DELETE BY TITLE] Success to delete all. ${count}`);
    }).catch(err => {
      console.log('[DELETE BY TITLE] ERROR HANDLER : ', err);
    });
}
