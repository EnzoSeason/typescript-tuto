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
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(title, desc, people, status, id = ++Project.projectId) {
        this.title = title;
        this.desc = desc;
        this.people = people;
        this.status = status;
        this.id = id;
    }
}
Project.projectId = 0;
class State {
    constructor() {
        this.listeners = [];
    }
    addListeners(fn) {
        this.listeners.push(fn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }
    addProject(title, desc, numOfPeople) {
        const newProject = new Project(title, desc, numOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);
        for (let listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
class Component {
    constructor(templateId, hostId, insertAtStart, elId) {
        this.templateEl = document.getElementById(templateId);
        this.hostEl = document.getElementById(hostId);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.el = importedNode.firstElementChild;
        if (elId) {
            this.el.id = elId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtStart) {
        if (insertAtStart) {
            this.hostEl.insertAdjacentElement("afterbegin", this.el);
        }
        else {
            this.hostEl.insertAdjacentElement("beforeend", this.el);
        }
    }
}
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.config();
        this.renderContent();
    }
    config() {
        projectState.addListeners((projects) => {
            const listProjects = projects.filter(project => {
                if (this.type === "active") {
                    return project.status === ProjectStatus.Active;
                }
                if (this.type === "finished") {
                    return project.status === ProjectStatus.Finished;
                }
                else {
                    return false;
                }
            });
            const newProjects = listProjects.filter(project => {
                const renderedProjects = this.assignedProjects
                    .filter(assignedProject => assignedProject.id === project.id);
                if (renderedProjects.length) {
                    return false;
                }
                else {
                    return true;
                }
            });
            this.assignedProjects = this.assignedProjects.concat(newProjects);
            this.renderProjects(newProjects);
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.el.querySelector('ul').id = listId;
        this.el.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects(newProjects) {
        let listEl = this.el.querySelector(`#${this.type}-projects-list`);
        for (const project of newProjects) {
            let item = document.createElement('li');
            item.textContent = project.title;
            listEl.appendChild(item);
        }
    }
}
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
            const [title, desc, people] = this.gatherUserInput();
            projectState.addProject(title, desc, people);
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
    autobind
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
