function* generator() {
    for(let i=0; i<100; i++) {
        yield i
    }
}

for(let item of generator()) {
    console.log(item);
}