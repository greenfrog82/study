/* jshint -W097 */
/*jslint node: true */
'use strict';

function doneOrNot(board){
  let value;
  // check row
  board.forEach(rows => { return (value = check(Object.assign([], rows))); });
  if(value) {
    // check column
    for(let i=0; i<board.length; i++) {
      let column = [];
      for(let j=0; j<board.length; j++) {
        column[j] = board[j][i];
      }
      if(!check(column)) {
        return 'Try again!';
      }
    }
  } else {
    return 'Try again!';
  }
  // check region
  for(let cnt=0; cnt<9; cnt++) {
    const region = [];
    let idx = 0;
    for(let i=Math.floor(cnt/3)*3; i<(Math.floor(cnt/3)+1)*3; i++) {
      for(let j=(cnt%3)*3; j<((cnt%3)+1)*3; j++) {
        region[idx++] = board[i][j];
      }
    }
    if(!check(region)) {
      return 'Try again!';
    }
  }
  return 'Finished!';
}

function check(rows) {
  let value = 1;
  rows.sort().forEach(item => {
    return (item != value)? (value = 0): value++;
  });
  return value;
}

console.log(doneOrNot([[5, 3, 4, 6, 7, 8, 9, 1, 2],
                       [6, 7, 2, 1, 9, 5, 3, 4, 8],
                       [1, 9, 8, 3, 4, 2, 5, 6, 7],
                       [8, 5, 9, 7, 6, 1, 4, 2, 3],
                       [4, 2, 6, 8, 5, 3, 7, 9, 1],
                       [7, 1, 3, 9, 2, 4, 8, 5, 6],
                       [9, 6, 1, 5, 3, 7, 2, 8, 4],
                       [2, 8, 7, 4, 1, 9, 6, 3, 5],
                       [3, 4, 5, 2, 8, 6, 1, 7, 9]]), 'Finished!');

 console.log(doneOrNot([[5, 3, 4, 6, 7, 8, 9, 1, 2],
                        [6, 7, 2, 1, 9, 0, 3, 4, 9],
                        [1, 0, 0, 3, 4, 2, 5, 6, 0],
                        [8, 5, 9, 7, 6, 1, 0, 2, 0],
                        [4, 2, 6, 8, 5, 3, 7, 9, 1],
                        [7, 1, 3, 9, 2, 4, 8, 5, 6],
                        [9, 0, 1, 5, 3, 7, 2, 1, 4],
                        [2, 8, 7, 4, 1, 9, 6, 3, 5],
                        [3, 0, 0, 4, 8, 1, 1, 7, 9]]), 'Try again!');

console.log(doneOrNot([ [ 1, 3, 2, 5, 7, 9, 4, 6, 8 ],
                        [ 4, 9, 8, 2, 6, 1, 3, 7, 5 ],
                        [ 7, 5, 6, 3, 8, 4, 2, 1, 9 ],
                        [ 6, 4, 3, 1, 5, 8, 7, 9, 2 ],
                        [ 5, 2, 1, 7, 9, 3, 8, 4, 6 ],
                        [ 9, 8, 7, 4, 2, 6, 5, 3, 1 ],
                        [ 2, 1, 4, 9, 3, 5, 6, 8, 7 ],
                        [ 3, 6, 5, 8, 1, 7, 9, 2, 4 ],
                        [ 8, 7, 9, 6, 4, 2, 1, 3, 5 ] ]), 'Try again!');

console.log(doneOrNot([ [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
                        [ 2, 3, 4, 5, 6, 7, 8, 9, 1 ],
                        [ 3, 4, 5, 6, 7, 8, 9, 1, 2 ],
                        [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
                        [ 5, 6, 7, 8, 9, 1, 2, 3, 4 ],
                        [ 6, 7, 8, 9, 1, 2, 3, 4, 5 ],
                        [ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
                        [ 8, 9, 1, 2, 3, 4, 5, 6, 7 ],
                        [ 9, 1, 2, 3, 4, 5, 6, 7, 8 ] ]), 'Try again!');
