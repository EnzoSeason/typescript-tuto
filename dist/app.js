"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
function inputValidate(config) {
    let isValid = true;
    if (config.required) {
        isValid = isValid && String(config.value).trim().length !== 0;
    }
    return isValid;
}
class ProjectInput {
    constructor() {
        this.templateEl = document.getElementById('project-input');
        this.hostEl = document.getElementById('app');
        const importedNode = document.importNode(this.templateEl.content, true);
        this.formEl = importedNode.firstElementChild;
        this.formEl.id = "user-input";
        this.titleInputEl = this.formEl.querySelector("#title");
        this.descriptionInputEl = this.formEl.querySelector("#description");
        this.peopleInputEl = this.formEl.querySelector("#people");
        this.config();
        this.attach();
    }
    gatherUserInput() {
        const title = this.titleInputEl.value;
        const desc = this.descriptionInputEl.value;
        const people = this.peopleInputEl.value;
        if (!inputValidate({ value: title, required: true }) ||
            !inputValidate({ value: desc, required: false }) ||
            !inputValidate({ value: people, required: true })) {
            alert('Form is not completed');
        }
        else {
            return [title, desc, Number(people)];
        }
    }
    submitHandler(event) {
        event.preventDefault();
        if (Array.isArray(this.gatherUserInput())) {
            const res = this.gatherUserInput();
            console.log(res);
        }
    }
    config() {
        this.formEl.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostEl.insertAdjacentElement("afterbegin", this.formEl);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
