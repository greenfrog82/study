/* jshint -W097 */
/*jslint node: true */
'use strict';

function order(words){
  if('' === words) {
    return '';
  }
  const eachWords = words.split(' ');

  const wordMap = new Map();
  const keys = [];

  eachWords.forEach((word) => {
    const number = word.match(/[1-9]/);
    keys.push(number[0]);
    wordMap.set(number[0], word);
  });

  const results = [];
  keys.sort();

  keys.forEach(key => {
    results.push(wordMap.get(key));
  });

  return results.join(" ");
}

console.log('order("is2 Thi1s T4est 3a") is "Thi1s is2 3a T4est" -> ', order("Thi1s is2 3a T4est"));
console.log('order("4of Fo1r pe6ople g3ood th5e the2") is "Fo1r the2 g3ood 4of th5e pe6ople" -> ', order("4of Fo1r pe6ople g3ood th5e the2"));
console.log('order("") is "" -> ', order(""));
