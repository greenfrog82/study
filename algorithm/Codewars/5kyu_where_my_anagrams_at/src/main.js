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

console.log(anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']).toString() === ['aabb', 'bbaa'].toString());
console.log(anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']).toString() === ['carer', 'racer'].toString());
console.log(anagrams('laser', ['lazing', 'lazy', 'lacer']).toString() === [].toString());