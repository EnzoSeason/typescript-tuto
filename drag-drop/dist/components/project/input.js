"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectInput = void 0;
const auto_bind_1 = require("../../decorators/auto-bind");
const project_state_1 = require("../../states/project-state");
class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, "user-input");
        this.titleInputEl = this.el.querySelector("#title");
        this.descriptionInputEl = this.el.querySelector("#description");
        this.peopleInputEl = this.el.querySelector("#people");
        this.config();
    }
    config() {
        this.el.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    gatherUserInput() {
        const title = this.titleInputEl.value;
        const desc = this.descriptionInputEl.value;
        const people = this.peopleInputEl.value;
        if (!auto_bind_1.inputValidate({ value: title, required: true }) ||
            !auto_bind_1.inputValidate({ value: desc, required: false }) ||
            !auto_bind_1.inputValidate({ value: people, required: true })) {
            alert('Form is not completed');
        }
        else {
            return [title, desc, Number(people)];
        }
    }
    submitHandler(event) {
        event.preventDefault();
        if (Array.isArray(this.gatherUserInput())) {
            const [title, desc, people] = this.gatherUserInput();
            project_state_1.projectState.addProject(title, desc, people);
            this.clearForm();
        }
    }
    clearForm() {
        this.titleInputEl.value = "";
        this.descriptionInputEl.value = "";
        this.peopleInputEl.value = "";
    }
}
__decorate([
    auto_bind_1.autobind
], ProjectInput.prototype, "submitHandler", null);
exports.ProjectInput = ProjectInput;
