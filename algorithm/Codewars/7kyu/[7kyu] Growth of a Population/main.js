function nbYear(p0, percent, aug, p) {
  var year = 0;
  percent /= 100;
  var recursiveCalc = function (p0, p) {
    p0 += p0 * percent + aug;
    year++;
    if(p0 >= p) {
      return year;
    }
    return recursiveCalc(p0, p);
  };
  return recursiveCalc(p0, p);
}

console.log('nbYear(1500, 5, 100, 5000) is 15', nbYear(1500, 5, 100, 5000));
console.log('nbYear(1500000, 2.5, 10000, 2000000) is 10', nbYear(1500000, 2.5, 10000, 2000000));
