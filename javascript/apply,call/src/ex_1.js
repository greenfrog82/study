/* jshint -W097 */
/*jslint node: true */
'use strict';

function printer() {
  console.log(`My name is ${this.name} and ${this.age} years old.`);
}

const person = {
  name: 'greenfrog',
  age: '35'
};

const animal = {
  name: 'lion',
  age: 1000
};

// printer.call(person);
// printer.call(animal);

printer.apply(person);
printer.apply(animal);
