const connect = require('camo').connect;

const uri = 'nedb://./db';

exports.connect = callback => {
  connect(uri).then(
    db => {
      console.log('[CONNECT] Success to connect into nedb.');
      callback();
    }
  ).catch(err => {
    console.error(`[CONNECT][ERROR HANDLER] ${err.stack}`);
  });
};
