# [Prime Streaming(PG-13)](https://www.codewars.com/kata/5519a584a73e70fa570005f5/train/javascript)

Create an endless stream of prime numbers - a bit like IntStream.of(2,3,5,7,11,13,17), but infinite. The stream must be able to produce a million primes in a few seconds.

If this is too easy, try [Prime Streaming (NC-17)](https://www.codewars.com/kata/prime-streaming-nc-17/).

## My Solution

```javascript
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
```

## Reference

* [[JAVA] 소수 구하기 최적의 알고리즘 (1)](http://marobiana.tistory.com/89)
* [[C++] 소수 구하기 최적의 알고리즘 (2) - 에라토스테네스의 체](http://marobiana.tistory.com/91)