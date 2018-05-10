# [6kyu] Evil Autocorrect Prank

### Description

The word i18n is a common abbreviation of internationalization the developer community use instead of typing the whole word and trying to spell it correctly. Similarly, a11y is an abbreviation of accessibility.

Write a function that takes a string and turns any and all "words" (see below) within that string of length 4 or greater into an abbreviation following the same rules.

Notes:

A "word" is a sequence of alphabetical characters. By this definition, any other character like a space or hyphen (eg. "elephant-ride") will split up a series of letters into two words (eg. "elephant" and "ride").
The abbreviated version of the word should have the first letter, then the number of removed characters, then the last letter (eg. "elephant ride" => "e6t r2e").

Example:
```
abbreviate("elephant-rides are really fun!")
//          ^^^^^^^^*^^^^^*^^^*^^^^^^*^^^*
// words (^):   "elephant" "rides" "are" "really" "fun"
//                123456     123     1     1234     1
// ignore short words:               X              X

// abbreviate:    "e6t"     "r3s"  "are"  "r4y"   "fun"
// all non-word characters (*) remain in place
//                     "-"      " "    " "     " "     "!"
=== "e6t-r3s are r4y fun!"
```


### My Solution

```javascript
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
```

### Others Solutions

```javascript
var find = /[a-z]{4,}/gi;
function replace(match) { return match[0] + (match.length - 2) + match[match.length - 1]; }

function abbreviate(string) {
  return string.replace(find, replace);
}
```

```javascript
function abbreviate(string) {
  return string.replace(/\w{4,}/g, function(word) {
    return word[0] + (word.length - 2) + word.slice(-1);
  });
}
```
