class Dep {
    constructor(public name: string) {}
}

class IT extends Dep {
    constructor(public name: string) {
        super(name);
    }
}