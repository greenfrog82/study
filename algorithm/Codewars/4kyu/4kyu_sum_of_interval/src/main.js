function sumIntervals(intervals) {
    const MIN = 0;
    const MAX = 1;

    let offset = 0;

    for(let i=0; i<intervals.length - 1; i++) {
        base = intervals[i];
        for(let j=i+1; j<intervals.length; j++) {
            target = intervals[j];
            if(base[MIN] <= target[MIN] && target[MIN] <= base[MAX]) {
                base[MAX] = (base[MAX] >= target[MAX])? base[MAX]: target[MAX];
                intervals[i] = null;
                intervals[j] = base;
            } else if(base[MIN] < target[MAX] && target[MAX] < base[MAX]) {
                base[MIN] = target[MIN];
                intervals[i] = null;
                intervals[j] = base;
            }
        }
    }

    let sum = 0;
    intervals.forEach(element => {
        if(element) {
            sum += element[MAX] - element[MIN];
        }
    });

    console.log(intervals);
    return sum;
}


let ret = sumIntervals([
    [1, 2],
    [6, 10],
    [11, 15]
]); // => 9

console.log(9 === ret);

ret = sumIntervals([
    [1, 4],
    [7, 10],
    [3, 5]
]); // => 7

console.log(7 === ret);

ret = sumIntervals([
    [1, 5],
    [10, 20],
    [1, 6],
    [16, 19],
    [5, 11]
]); // => 19

console.log(19 === ret);