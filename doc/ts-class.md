# Class & Interface

## Class

```typescript
class Department {
    name: string;

    constructor(n: string) {
        this.name = n;
    }
}

const accouting = new Derpartment("Accounting");
```

### key word: this

`this` is tricky, for example. 

```typescript
class Department {
    // ... basic init
    describe() {
        console.log("Dep. " + this.name);
    }
}

const accouting = new Derpartment("Accounting");
cost accoutingCopy = {describe: accounting.describe};

accouting.describe(); // Dep. Accounting
accountingCopy.describe(); // Dep. undefinded
```
In this example, `this` in `accountingCopy` is binded to the dummy object `{describe: accounting.describe}`. This object doesn't has `name` property, so its output is undefinded. 

TypeScript can notify developper that there has missing property by passing `this` as a parameter into the methods in Class (just like the Class in Python).

```typescript
class Department {
    // ... basic init
    describe(this: Departement) {
        console.log("Dep. " + this.name);
    }
}
```

### Inheritance

```typescript
class ITSupport extends Departement {
    constructor() {
        super("IT");
    }
} 
```

### private protected, public modifier

The key word `private` can make `property`or `method` of the class only accessable by Class, not by Public.

```typescript
class Department {
    // ... basic init
    private employees: string[] = [];
}
```

shortcut: using `private / public` keyword, we can `defind and initialize` the property in constructor's parameters. 

```typescript
class Department {
    // ... basic init
    // public name: string
    constructor(public name:string){
        // this.name = name;
    }
}
```

The `protected` modifier acts much like the `private` modifier with the exception that members declared protected can also be accessed within `deriving classes`.

A `constructor` may also be marked protected. This means that the class **cannot be instantiated outside of its containing class**, but can be extended.

### readonly modifier

Readonly properties must be initialized at their declaration or in the constructor. And they can not be modified.

```typescript
class Department {
    // ... basic init
    constructor(
        private readonly id: number, 
        public name:string){}
}
```