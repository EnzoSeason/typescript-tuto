"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
class State {
    constructor() {
        this.listeners = [];
    }
    addListeners(fn) {
        this.listeners.push(fn);
    }
}
exports.State = State;
//# sourceMappingURL=state.js.map