function presses(phrase) {
  var count = 0;

  if(0 === phrase.length) {
    return count;
  }

  phrase = phrase.toLowerCase();

  for (var i = 0; i < phrase.length; i++) {
    var asciiCode = phrase[i].charCodeAt(0);

    if('0'.charCodeAt(0) === asciiCode) {
      count += 2;
    } else if('1'.charCodeAt(0) === asciiCode || ' '.charCodeAt(0) === asciiCode) {
      count += 1;
    } else if('2'.charCodeAt(0) <= asciiCode && '6'.charCodeAt(0) >= asciiCode || '8'.charCodeAt(0) === asciiCode) {
      count += 4;
    } else if('7'.charCodeAt(0) === asciiCode || '9'.charCodeAt(0) === asciiCode) {
      count += 5;
    } else if ('a'.charCodeAt(0) <= asciiCode && 'o'.charCodeAt(0) >= asciiCode) { // alphabet
      count += (asciiCode - 'a'.charCodeAt(0)) % 3 + 1;
    } else if('p'.charCodeAt(0) <= asciiCode && 's'.charCodeAt(0) >= asciiCode) {
      count += (asciiCode - 'p'.charCodeAt(0)) % 4 + 1;
    } else if('t'.charCodeAt(0) <= asciiCode && 'v'.charCodeAt(0) >= asciiCode) {
      count += (asciiCode - 't'.charCodeAt(0)) % 3 + 1;
    } else if('w'.charCodeAt(0) <= asciiCode && 'z'.charCodeAt(0) >= asciiCode) {
      count += (asciiCode - 'w'.charCodeAt(0)) % 4 + 1;
    } else {
      //  Punctuation can be ignored for this exercise.
      console.log(asciiCode);
    }
  }




  return count;
}

console.log('presses("LOL") is 9', presses("LOL"));
console.log('presses("HOW R U") is 13', presses("HOW R U"));
console.log('presses("WHERE DO U WANT 2 MEET L8R") is 47', presses("WHERE DO U WANT 2 MEET L8R"));
