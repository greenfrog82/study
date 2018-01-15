function test() {
    var x = 0;
    return x = 1, x = 2;
}

res = test();
// expected output: 2

console.log('res = ', res);