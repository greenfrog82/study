/* jshint -W097 */
/*jslint node: true */
'use strict';

exports.remove = (arr, value) => {
  let targetIdx = -1;
  arr.find((item, idx) => {
    if(item.key === value) {
      targetIdx = idx;
      return true;
    }
    return false;
  });

  if(0 > targetIdx) {
    return false;
  } 
  arr.splice(targetIdx, 1);
  return true;
};
