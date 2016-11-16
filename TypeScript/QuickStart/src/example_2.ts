class Student {
  fullName: string;
  constructor(public firstName, public middleInitial, public lastName) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function _greeter(person : Person) {
  return `[example_2] Hello, ${person.firstName} ${person.lastName}`;
}

const _user = new Student('Jane', 'M.', 'User');

document.getElementById('ex_2').innerHTML = _greeter(_user);

function Test() {
  console.log('test');
}

function Build() {
    test();
}

function AllBuild() {
  console.log('All Build');
}
