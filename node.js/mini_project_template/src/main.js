/* jshint -W097 */
/*jslint node: true */
'use strict';

function pickPeaks(arr){
  const result = {
    pos: [],
    peaks: [],
  };

  let tmp;
  for(let i=1; i<arr.length-1; i++) {
    if(arr[i-1] < arr[i] && arr[i] > arr[i+1]) {
      result.pos.push(i);
      result.peaks.push(arr[i]);
      tmp = undefined;
    } else if (arr[i-1] < arr[i] && arr[i] === arr[i+1]){
      tmp = {
        pos: i,
        value: arr[i]
      };
    } else if(undefined !== tmp && (tmp.value === arr[i] && tmp.value > arr[i+1])) {
      result.pos.push(tmp.pos);
      result.peaks.push(tmp.value);
      tmp = undefined;
    }
    console.log('tmp =', tmp);
    console.log(`arr[i] = ${arr[i]}`);
    console.log(`arr[i+1] = ${arr[i+1]}`);
  }

  return result;
}

// console.log(pickPeaks([3,2,3,6,4,1,2,3,2,1,2,3]));
console.log(pickPeaks([1,2,2,2,2,2,1,3,3,3,2,6,7,8,1]));

//st.assertSimilar(pickPeaks([3,2,3,6,4,1,2,3,2,1,2,3]),{pos:[3,7],peaks:[6,3]})
