function greeter(person: string) {
    return "[example_1] Hello, " + person;
}

const user = "Jane User";
// const user = [0, 1, 2];

document.getElementById('ex_1').innerHTML = greeter(user);
