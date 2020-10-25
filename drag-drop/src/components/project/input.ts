import { autobind, inputValidate } from "../../decorators/auto-bind";
import { projectState } from "../../states/project-state";
import { Component } from "./abstract-project";

export class ProjectInput extends Component<HTMLDivElement>{
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLTextAreaElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, "user-input");

        this.titleInputEl = this.el.querySelector("#title") as HTMLInputElement;
        this.descriptionInputEl = this.el.querySelector("#description") as HTMLTextAreaElement;
        this.peopleInputEl = this.el.querySelector("#people") as HTMLInputElement;
        this.config();
    }

    config() {
        this.el.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
        const title = this.titleInputEl.value;
        const desc = this.descriptionInputEl.value;
        const people = this.peopleInputEl.value;

        if (
            !inputValidate({value: title, required: true}) || 
            !inputValidate({value: desc, required: false}) || 
            !inputValidate({value: people, required: true})) {
                alert('Form is not completed');
        } else {
            return [title, desc, Number(people)];
        }
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();

        if (Array.isArray(this.gatherUserInput())) {
            const [title, desc, people] = this.gatherUserInput() as [string, string, number];
            projectState.addProject(title, desc, people);
            this.clearForm();
        }
    }
    
    private clearForm() {
        this.titleInputEl.value = "";
        this.descriptionInputEl.value = "";
        this.peopleInputEl.value = "";
    }
}