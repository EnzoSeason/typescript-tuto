# Decorator

```typescript
function logger(constructor: Function) {
    console.log(constructor);
}

@logger
class Test {
    constructor(
        public name: string
    ) {}
}
```

`logger()` is executed when `Test` is **definded**, not is **instantiated**.