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
        this.notifyListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(project => project.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.notifyListeners();
        }
    }
    notifyListeners() {
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
class ProjectItem extends Component {
    constructor(hostId, project) {
        super('single-project', hostId, false, project.id.toString());
        this.project = project;
        this.config();
        this.renderContent();
    }
    get nbOfPeople() {
        if (this.project.people === 1) {
            return "1 person";
        }
        else {
            return this.project.people + " persons";
        }
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id.toString());
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) { }
    config() {
        this.el.addEventListener('dragstart', this.dragStartHandler);
    }
    renderContent() {
        this.el.querySelector('h2').textContent = this.project.title;
        this.el.querySelector('h3').textContent = this.nbOfPeople;
        this.el.querySelector('p').textContent = this.project.desc;
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragStartHandler", null);
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.config();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.el.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const projectId = Number(event.dataTransfer.getData('text/plain'));
        if (!isNaN(projectId)) {
            projectState.moveProject(projectId, this.type === "active"
                ? ProjectStatus.Active
                : ProjectStatus.Finished);
        }
        const listEl = this.el.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    dragLeaveHandler(_) {
        const listEl = this.el.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    config() {
        this.el.addEventListener('dragover', this.dragOverHandler);
        this.el.addEventListener('drop', this.dropHandler);
        this.el.addEventListener('dragleave', this.dragLeaveHandler);
        projectState.addListeners((projects) => {
            this.assignedProjects = projects.filter(project => {
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
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.el.querySelector('ul').id = listId;
        this.el.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = this.el.querySelector('ul');
        listEl.innerHTML = "";
        for (const project of this.assignedProjects) {
            new ProjectItem(this.el.querySelector('ul').id, project);
        }
    }
}
__decorate([
    autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    autobind
], ProjectList.prototype, "dragLeaveHandler", null);
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
