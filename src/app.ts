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

class ProjectState {
    private static instance: ProjectState;

    public static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }

    private projects: any[] = [];
    private listeners: Function[] = []; // update projects

    private constructor() {}

    public addProject(title: string, desc: string, numOfPeople: number) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: desc,
            people: numOfPeople
        }
        this.projects.push(newProject);
        for(let listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }

    public addListeners(fn: Function) {
        this.listeners.push(fn);
    }
}

const projectState = ProjectState.getInstance();

class ProjectList {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    el: HTMLElement;

    assignedProjects: any[] = [];

    constructor(
        private type: 'active' | 'finished') {
        this.templateEl = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostEl = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(
            this.templateEl.content, true
        );
        
        this.el = importedNode.firstElementChild as HTMLElement;
        this.el.id = `${this.type}-projects`;

        projectState.addListeners((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        
        this.renderContent();
        this.attach();
    }

    private renderProjects() {
        let listEl = this.el.querySelector(`#${this.type}-projects-list`)! as HTMLUListElement;
        for (const project of this.assignedProjects) {
            let item = document.createElement('li');
            item.textContent = project.title;
            listEl.appendChild(item);
        }
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.el.querySelector('ul')!.id = listId;
        this.el.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private attach() {
        this.hostEl.insertAdjacentElement("beforeend", this.el);
    }

}

class ProjectInput {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    el: HTMLElement;
    titleInputEl: HTMLInputElement;
    descriptionInputEl: HTMLTextAreaElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
        this.templateEl = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostEl = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(
            this.templateEl.content, true
        );
        
        this.el = importedNode.firstElementChild as HTMLElement;
        this.el.id = "user-input";

        this.titleInputEl = this.el.querySelector("#title") as HTMLInputElement;
        this.descriptionInputEl = this.el.querySelector("#description") as HTMLTextAreaElement;
        this.peopleInputEl = this.el.querySelector("#people") as HTMLInputElement;

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
            const [title, desc, people] = this.gatherUserInput() as [string, string, number];
            projectState.addProject(title, desc, people);
        }
    } 

    private config() {
        this.el.addEventListener('submit', this.submitHandler);
    }

    private attach() {
        this.hostEl.insertAdjacentElement("afterbegin", this.el);
    }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');