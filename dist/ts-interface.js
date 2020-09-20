"use strict";
class Person {
    constructor(name, phrase) {
        this.name = name;
        this.phrase = phrase;
    }
    greet() {
        let greeting = 'Hi';
        if (this.phrase) {
            greeting = greeting + '! ' + this.phrase;
        }
        console.log(greeting);
    }
}
let user = new Person("Jack");
user.greet();
