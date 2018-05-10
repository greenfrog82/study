/* jshint -W097 */
/*jslint node: true */
'use strict';

function abbreviate(string) {
  return string.split(' ').map(word => {
    if(0 <= word.indexOf('-')) {
      return word.split('-').map(_word => {
        return perform(_word);
      }).join('-');
    } else {
      return perform(word);
    }
  }).join(' ');
}

function perform(word) {
  const regex = /\w+/;
  const matchedWordInfo = regex.exec(word);
  if(null === matchedWordInfo || 3 >= matchedWordInfo[0].length) {
    return word;
  } else {
    const matchedWord = matchedWordInfo[0];
    const abbreviatedWord = `${matchedWord[0]}${matchedWord.length-2}${matchedWord[matchedWord.length-1]}`;
    return word.replace(regex, abbreviatedWord);
  }
}

// "e6t-r3s are r4y fun!"
console.log(abbreviate('elephant-rides are really fun!'));
