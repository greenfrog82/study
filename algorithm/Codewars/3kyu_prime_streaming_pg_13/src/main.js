class Primes {
	static * stream() {
		let num = 2;
		let isPrime;
		let idx = 0;

		let primesIdx = 0;
		let primes = [];
		
		while(true) {
			isPrime = true;

			for(let i=2; i <= Math.sqrt(num); i = (primes.length > primesIdx)? primes[++primesIdx]: i + 1) {
				if(0 === (num % i)) {
					num++;
					isPrime = false;
					break;
				}
			}
			
			primesIdx = 0;

			if(isPrime) {
				primes.push(num);
				yield num++;
			}
		}
	}
}

function verify(from_n, ...vals) {
	const stream = Primes.stream();
	let val;
	for(let i=0; i<from_n; ++i) {
		val = stream.next();
		// console.log('--->', val);
	}
	for(let v of vals) {
		val = stream.next().value;
		// console.log('---]', val);
		if(v !== val) {
			return false;
		}
	}
	return true;
}

console.log(verify(0,2,3,5,7,11,13,17,19,23,29));
console.log(verify(10,31,37,41,43,47,53,59,61,67,71));
console.log(verify(100,547,557,563,569,571,577,587,593,599,601));
console.log(verify(1000,7927,7933,7937,7949,7951,7963,7993,8009,8011,8017));

console.time('verify(1000000)');
console.log(verify(1000000))
console.timeEnd('verify(1000000)');