/* jshint -W097 */
/*jslint node: true */
'use strict';

const Movie = require('./schema').Movie;

// Create
exports.create = (movie) => {
  Movie.create(movie).save().then(
    savedRes => {
      console.log(`[CREATE] Success to save successfully. ${JSON.stringify(savedRes)}`);
    }
    // },
    // err => {
    //   console.log(`[saveMovie] Fail to save. ${err} ${err.stack}`);
    // }
  ).catch(err => {
    console.log(`[CREATE] ERROR HANDLER : ${err}`);
  });
};

// Read by title
exports.readByTitle = (title) => {
  Movie.findOne({title: title}).then(
    foundMovie => {
      console.log(`[READ BY TITLE] Success to read by ${foundMovie.title}. ${JSON.stringify(foundMovie)}`);
    }
  ).catch(err => {
    console.log('[READ BY TITLE] ERROR HANDLER : ', err);
  });
};

// Read all
exports.readAll = () => {
  Movie.find({}).then(
    foundMovies => {
      console.log(`[READ ALL] Success to read all.`);
      foundMovies.forEach(movie => {
        console.log(movie);
      });
    }
  ).catch(err => {
    console.log('[READ ALL] ERROR HANDLER : ', err);
  });
};

// Read all by title
exports.readAllByTitle = (title) => {
  Movie.find({title: title}).then(
    foundMovies => {
      console.log(`[READ ALL BY TITLE] Success to read all.`);
      foundMovies.forEach(movie => {
        console.log(movie);
      });
    }
  ).catch(err => {
    console.log('[READ ALL BY TITLE] ERROR HANDLER : ', err);
  });
};

// Update
exports.updateByTitle = (title, rating) => {
  Movie.findOneAndUpdate({title: title}, {rating: rating}).then(
    foundMovie => {
      console.log(`[UPDATE BY TITLE] Success to find and update by ${foundMovie.title}. ${JSON.stringify(foundMovie)}`);
    }
    // },
    // err => {
    //   console.log(`[updateByTitle] Fail to find and update about ${id}. ${err.stack}`);
    // }
  ).catch(err => {
    console.log('[UPDATE BY TITLE] ERROR HANDLER : ', err);
  });
};

// Delete by title
exports.deleteByTitle = (title) => {
  Movie.deleteOne({title:title}).then(
    count => {
      console.log(`[DELETE BY TITLE] Success to delete by title. ${count}`);
    }
  ).catch(err => {
    console.log('[DELETE BY TITLE] ERROR HANDLER : ', err);
  });
};

// Delete all
exports.deleteAll = () => {
  Movie.deleteMany({}).then(
    count => {
      console.log(`[DELETE BY TITLE] Success to delete all. ${count}`);
    }
  ).catch(err => {
    console.log('[DELETE BY TITLE] ERROR HANDLER : ', err);
  });
};
