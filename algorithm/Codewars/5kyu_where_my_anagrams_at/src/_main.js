String.prototype.sort = function() {
	return this.split('').sort().join('');
}

function anagrams(word, words) {
	return words.filter(element => word.sort() === element.sort());
}

console.log(anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']).toString() === ['aabb', 'bbaa'].toString());
console.log(anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']).toString() === ['carer', 'racer'].toString());
console.log(anagrams('laser', ['lazing', 'lazy', 'lacer']).toString() === [].toString());