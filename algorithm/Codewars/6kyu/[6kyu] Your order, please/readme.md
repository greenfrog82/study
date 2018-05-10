# [6kyu] Your order, please

### Description

Your task is to sort a given string. Each word in the String will contain a single number. This number is the position the word should have in the result.

Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).

If the input String is empty, return an empty String. The words in the input String will only contain valid consecutive numbers.

For an input: "is2 Thi1s T4est 3a" the function should return "Thi1s is2 3a T4est"

### My Solution

```javascript
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
```

### Others Solutions

```javascript
function order(words){
  return words.split(' ').sort(function(a, b){
      return a.match(/\d/) - b.match(/\d/);
   }).join(' ');
}    
```

```javascript
var reg = /\d/;

function order(words){
  return words.split(' ').sort(comparator).join(' ');
}

function comparator(word, nextWord) {
  return +word.match(reg) - +nextWord.match(reg)
}
```
