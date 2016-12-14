const fs = require('fs');

fs.writeFile('c:/pm2_test_permission.log', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
