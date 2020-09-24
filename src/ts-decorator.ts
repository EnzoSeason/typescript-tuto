function logger(constructor: Function) {
    console.log(constructor);
}

@logger
class Test {
    constructor(
        public name: string
    ) {}
}