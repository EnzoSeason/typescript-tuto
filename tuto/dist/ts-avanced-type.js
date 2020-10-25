"use strict";
var _a;
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
add('1', 2);
const jack = {
    job: {
        title: 'CEO'
    },
    age: null
};
console.log((_a = jack === null || jack === void 0 ? void 0 : jack.job) === null || _a === void 0 ? void 0 : _a.title);
console.log(jack === null || jack === void 0 ? void 0 : jack.age);
