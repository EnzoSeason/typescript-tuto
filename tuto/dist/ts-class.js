"use strict";
class Departement {
    constructor(_name) {
        this._name = _name;
    }
    static showCompany() {
        console.log("test company");
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
}
class ITSupport extends Departement {
    constructor(developpers) {
        super("IT");
        this.developpers = developpers;
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ITSupport(["a"]);
            return this.instance;
        }
    }
    describe() {
        console.log("Dep. IT");
    }
}
const it = ITSupport.getInstance();
