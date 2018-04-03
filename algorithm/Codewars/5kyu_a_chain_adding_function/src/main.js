function add(n) {
    const f = x => add(n + x);
    f.valueOf = () => n;
    return f;
}

console.log(add(1) == 1);
console.log(add(1)(2) == 3);
console.log(add(1)(2)(3) == 6);