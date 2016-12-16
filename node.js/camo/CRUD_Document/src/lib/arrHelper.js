exports.remove = (arr, value) => {
  let targetIdx = -1;
  arr.find((item, idx) => {
    if(item.key === value) {
      targetIdx = idx;
      return true;
    }
    return false;
  });
  arr.splice(targetIdx, 1);
};
