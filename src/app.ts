function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    };
    return adjDescriptor;
}

interface Validatable {
    value: string | number,
    required?: boolean
}

function inputValidate(config: Validatable) {
    let isValid = true;

    if (config.required) {
        isValid = isValid && String(config.value).trim().length !== 0;
    }

    return isValid;
}

class ProjectInput {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    formEl: HTMLFormElement;
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLTextAreaElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
        this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostEl = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(
            this.templateEl.content, true
        );
        
        this.formEl = importedNode.firstElementChild as HTMLFormElement;
        this.formEl.id = "user-input";

        this.titleInputEl = this.formEl.querySelector("#title") as HTMLInputElement;
        this.descriptionInputEl = this.formEl.querySelector("#description") as HTMLTextAreaElement;
        this.peopleInputEl = this.formEl.querySelector("#people") as HTMLInputElement;

        this.config();
        this.attach();
    }

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
            const res = this.gatherUserInput();
            console.log(res);
        }
    } 

    private config() {
        this.formEl.addEventListener('submit', this.submitHandler);
    }

    private attach() {
        this.hostEl.insertAdjacentElement("afterbegin", this.formEl);
    }
}

const projectInput = new ProjectInput();