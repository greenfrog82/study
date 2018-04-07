class Primes {
	static * stream() {
		// replace this with your solution
		for(let p in [2,3,5,7,11,13,17,19,23,29]) {
				yield p;
		}
	}
}


function verify(from_n, ...vals) {
	const stream = Primes.stream();
	for(let i=0; i<from_n; ++i) stream.next()
	debugger;
	for(let v of vals) {
		if(v !== stream.next()) {
			return false;
		}
	}
	return true;
}

console.log(verify(0,2,3,5,7,11,13,17,19,23,29));