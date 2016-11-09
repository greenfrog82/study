function validatePIN (pin) {
  // return /\d{4}|\d{6}/.test(pin);
  // return /^\d{4}$|^\d{6}$/.test(pin);
  return /^(\d{4}|\d{6})$/.test(pin);
}

console.log("validatePIN('1234') is true.", validatePIN('1234'));
console.log("validatePIN('12354') is false.", validatePIN('12354'));
console.log("validatePIN('a234') is false.", validatePIN('a234'));
console.log("validatePIN('123456') is true.", validatePIN('123456'));
console.log("validatePIN('1234a6') is false.", validatePIN('1234a6'));
console.log("validatePIN('1 2 3 4 5 6') is false.", validatePIN('1 2 3 4 5 6'));
console.log("validatePIN('1 2 345 6') is false.", validatePIN('1 2 345 6'));
