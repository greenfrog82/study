var x = 1;

x = (x++, x)

console.log('(x++, x) = ', x);
// expected output: 2

x = (2, 3);

console.log('(2, 3) = ', x);
// expected output: 3

x = 1;

x = x++ , x;

console.log('x++, x = ', x);
// expected output: 1

x = 2, 3;

console.log('2, 3 = ', x);
// expected output: 2

