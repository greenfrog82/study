/* jshint -W097 */
/*jslint node: true */
'use strict';

const Movie = require('./schema').Movie;

// Create
exports.create = (movie) => {
  Movie.create(movie).save().then(
    savedRes => {
      console.log(`[CREATE] Success to save successfully. ${JSON.stringify(savedRes)}`);
    }).catch(err => {
      console.log(`[CREATE] ERROR HANDLER : ${err}`);
    });
};

// Read by title
exports.readByTitle = (title) => {
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
};

// Read all
exports.readAll = () => {
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
};

// Read all by title
exports.readAllByTitle = (title) => {
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
};

// Update
exports.updateByTitle = (title, rating) => {
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
};

// Delete by title
exports.deleteByTitle = (title) => {
  Movie.deleteOne({title:title}).then(
    count => {
      console.log(`[DELETE BY TITLE] Success to delete by title. ${count}`);
    }).catch(err => {
      console.log('[DELETE BY TITLE] ERROR HANDLER : ', err);
    });
};

// Delete all
exports.deleteAll = () => {
  Movie.deleteMany({}).then(
    count => {
      console.log(`[DELETE BY TITLE] Success to delete all. ${count}`);
    }).catch(err => {
      console.log('[DELETE BY TITLE] ERROR HANDLER : ', err);
    });
};

// Read and Delete by title
exports.readAndDelete = (title) => {
  Movie.findOne({title:title}).then(
    foundMovie => {
      if(foundMovie) {
        console.log('[READ AND DELETE] Success to find movie. So try to delete this.', foundMovie.title);
        foundMovie.delete().then(
          count => {
            console.log('[READ AND DELETE] Success to delete found movie.', foundMovie.title);
          }
        ).catch(err => {
          console.error('[READ AND DELETE][DELETE] ERROR HANDLER : ', err);
        });
      } else {
        console.log('[READ AND DELETE] There is no movie.');
      }
    }
  ).catch(err => {
    console.error('[READ AND DELETE][READ] ERROR HANDLER : ', err);
  });

  // 아래 메소드를 통해 삭제된 아이템을 반환받을 수 있을줄 알았는데 안된다.
  // 따라서 위 코드를 통해 이와 같은 동작을 할 수 있도록 함수를 작성하였다.
  // Camo 개발자에게 관련 이슈(https://github.com/scottwrobinson/camo/issues/89)를
  // 전달하였으니 답변이 오겠지 ..
  // Movie.findOneAndDelete({title:title}).then(
  //   movie => {
  //     console.log('[READ AND DELETE] ', movie);
  //   }
  // ).catch(err => {
  //   console.log('[READ AND DELETE] ERROR HANDLER : ', err);
  // });
};
