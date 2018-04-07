# [Where my anagrams at?](http://www.codewars.com/kata/where-my-anagrams-at/train/javascript)

What is an anagram? Well, two words are anagrams of each other if they both contain the same letters. For example:

```
'abba' & 'baab' == true

'abba' & 'bbaa' == true

'abba' & 'abbba' == false
```

Write a function that will find all the anagrams of a word from a list. You will be given two inputs a word and an array with words. You should return an array of all the anagrams or an empty array if there are none. For example:

```
anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) => ['aabb', 'bbaa']

anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) => ['carer', 'racer']

anagrams('laser', ['lazing', 'lazy',  'lacer']) => []
```

## My Solution

```javascript
function anagrams(word, words) {
	const ret = [];
	words.forEach(element => {
		if(word.length !== element.length) {
			return;
		}
		const backup = element;
		for(let idx=0; idx<word.length; idx++) {
			let foundIdx = element.indexOf(word[idx]);
			if(0 > foundIdx) {
				return;
			} else if(0 == foundIdx) {
				element = element.substr(1);
			} else {
				element = element.substr(0, foundIdx) + element.substr(foundIdx + 1);
			}
		}
		if(0 >= element.length) {
			ret.push(backup);
		}
	});
	return ret;
}
```

## Other Solutions

```javascript
String.prototype.sort = function() {
  return this.split("").sort().join("");
};

function anagrams(word, words) {
  return words.filter(function(x) {
      return x.sort() === word.sort();
  });
}
```
