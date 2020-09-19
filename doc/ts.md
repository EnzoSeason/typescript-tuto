# Typescript

Types in TS are string, number, boolean, object, etc. All in lowercase. 

## Type Assigment

```typescript
// using type inference, here
// good pratice
let a = 5; 
// or
let a: number;
```

## object

* Unlike JS, object can't be added property after definition in TS.
* All object has object type in TS.

### object Type

```typescript
const person: {
    name: string;
    age: number;
}
```

## array and tuple

Array is type[]. For example, `let strArr = string[]`.

Tuple fix the length of array. For example, `let arr: [number, number]`. That means `arr` only contains 2 elements.

> Attention: we can still use arr.push(2) to add the third element. 

## enum

```typescript
enum Role {ADMIN, USER}

let a = Role.ADMIN; 
```
`ADMIN` has a value, too. It's `0`. We can set it by: 
```typescript
enum Role {ADMIN = 'admin', USER}
```

## union type, literal type

```typescript
let a: string | number; // a is string or number
```

```typescript
let a: "aaa"; // The type of a is aaa. 
```

## alian type

```typescript
type User = {name: string; age: number};

let user: User;
```

## function type

```typescript
let func: (param1: number, param2: number) => number;
```

Full example:

```typescript
function f(a: number, func: (b: number) => void): number {
    return a;
}

let b = 1;
let func = f(b, (b) => b);
```

Here, in `f()`, we define `func` as a callback function. This callback function returns `void` means it will do nothing about the return, DO NOT mean it need nothing to be returned.

## unknown vs any

```typescript
let userInput: unknown;
let name: string;

name = userInput; // error
```

```typescript
let userInput: any;
let name: string;

name = userInput; // pass
```

`unknown` is more strict than `any` in type.

## never

never is the return type for a function expression or an arrow function expression that always **throws an exception** or has an **Infinite loop**. 
