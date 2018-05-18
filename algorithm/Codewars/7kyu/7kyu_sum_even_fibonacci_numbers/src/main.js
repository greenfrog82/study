function wrapper() {
    let sum = 0
    function perform(num) {
        sum = sum + num
        return sum
    }
    return perform
}

let perform = wrapper()
console.log(perform(100))
console.log(perform(100))