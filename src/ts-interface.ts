interface Named {
   readonly name: string;
}

interface Greetable extends Named{
    phrase?: string;

    greet(): void;
}

class Person implements Greetable {
    constructor(
        public name: string, 
        public phrase?: string){}

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