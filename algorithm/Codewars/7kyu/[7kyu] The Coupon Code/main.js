function checkCoupon(enteredCode, correctCode, currentDate, expirationDate) {
  return enteredCode == correctCode && Date.parse(currentDate) <= Date.parse(expirationDate);
}

console.log('This is true : ', checkCoupon('123','123','September 5, 2014','October 1, 2014'));
console.log('This is false : ', checkCoupon('123a','123','September 5, 2014','October 1, 2014'));
console.log('This is false : ', checkCoupon('123a','123','October 1, 2014','October 1, 2014'));
