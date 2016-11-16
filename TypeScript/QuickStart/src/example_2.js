var Student = (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function _greeter(person) {
    return "[example_2] Hello, " + person.firstName + " " + person.lastName;
}
var _user = new Student('Jane', 'M.', 'User');
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
