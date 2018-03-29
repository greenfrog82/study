let arr = [1, 2, 3, 4, 5];

// let isExist = arr.some(element => 0 === element % 2);

let isExist = arr.some((element, index, array) => {
    array[0] = 100;
    console.log(array);
    return false;
})

console.log(arr);

console.log(`is exist? : ${isExist}`);