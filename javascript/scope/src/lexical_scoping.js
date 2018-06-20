'use strict'

function Counter() {
    this.num = 0

    // this.timer = setInterval(() => {
    //    this.num++ 
    //    console.log(this.num)
    // }, 1000)

    this.timer = setInterval.bind(this)(function() {
        console.log(this)
        // this.num++
        // console.log(this.num)
    }, 1000)
}

new Counter()

var dog = 'dog'

function outerFunc() {
    var cat = 'cat'

    function innerFunc() {
        console.log(cat);
        console.log(dog)
    }
    return innerFunc
}

// outerFunc()()

const obj = {
    perform: () => {
        console.log(this)
    },
    perform2: function() {
        console.log(this)
    }
}

// obj.perform()
// obj.perform2()