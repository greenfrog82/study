/* jshint -W097 */
/*jslint node: true */
'use strict';

function autocorrect(input){
  return input.replace(/\byou(?!\w)\b|\bu\b|(\byou+\b)/ig, 'your sister');
}

//✘ Expected: 'your sister should come over Friday night', instead got: 'You should come over Friday night'
//✘ Expected: 'your sister your sister youville utube your sister youyouyou uuu raiyou united your sister your sister your sister', instead got: 'You your sister youville utube your sister youyouyou uuu raiyou united youuuu your sister your sister'
//✘ Expected: 'your sister want to go to the movies?', instead got: 'u want to go to the movies?'
// const input = 'You should come over Friday night';
// const input = 'You your sister youville utube your sister youyouyou uuu raiyou united youuuu your sister your sister';
const input = 'u want to go to the movies?';
console.log(autocorrect(input));
