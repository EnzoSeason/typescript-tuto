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
    required?: boolean,
}

function inputValidate(config: Validatable) {
    let isValid = true;

    if (config.required) {
        isValid = isValid && String(config.value).trim().length !== 0;
    }

    return isValid;
}

interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

// classes

enum ProjectStatus {Active, Finished}

class Project {
    static projectId = 0;
    constructor(
        public title: string,
        public desc: string,
        public people: number,
        public status: ProjectStatus,
        public id = ++Project.projectId,
    ){}
}

type ListenerFn<T> = (projects: T[]) => void;

class State<T> {
    protected listeners: ListenerFn<T>[] = [];

    addListeners(fn: ListenerFn<T>) {
        this.listeners.push(fn);
    }
}

class ProjectState extends State<Project>{
    private static instance: ProjectState;

    public static getInstance() {
        if (this.instance) {
            return this.instance;
        } else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }

    private projects: Project[] = [];

    private constructor() {
        super();
    }

    public addProject(title: string, desc: string, numOfPeople: number) {
        const newProject = new Project(
            title,
            desc,
            numOfPeople,
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        this.notifyListeners();
    }

    public moveProject(projectId: number, newStatus: ProjectStatus) {
        const project = this.projects.find(project => project.id === projectId);
        
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.notifyListeners();
        } 
    }

    private notifyListeners() {
        for(let listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance();

abstract class Component<T extends HTMLElement> {
    templateEl: HTMLTemplateElement;
    hostEl: T;
    el: HTMLElement;

    constructor(
        templateId: string,
        hostId: string,
        insertAtStart: boolean,
        elId?: string
    ){
        this.templateEl = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostEl = document.getElementById(hostId)! as T;

        const importedNode = document.importNode(
            this.templateEl.content, true
        );
        this.el = importedNode.firstElementChild as HTMLElement;
        if (elId) {
            this.el.id = elId;
        }

        this.attach(insertAtStart);
    }

    abstract config(): void;
    abstract renderContent(): void;

    protected attach(insertAtStart: boolean) {
        if (insertAtStart) {
            this.hostEl.insertAdjacentElement("afterbegin", this.el);
        } else {
            this.hostEl.insertAdjacentElement("beforeend", this.el);
        }
    }

}

class ProjectItem extends Component<HTMLUListElement> implements Draggable {
    private project: Project;

    get nbOfPeople() {
        if (this.project.people === 1) {
            return "1 person";
        } else {
            return this.project.people + " persons";
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id.toString());
        this.project = project;

        this.config();
        this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id.toString());
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent) {}

    config() {
        this.el.addEventListener('dragstart', this.dragStartHandler);
    }

    renderContent() {
        this.el.querySelector('h2')!.textContent = this.project.title;
        this.el.querySelector('h3')!.textContent = this.nbOfPeople;
        this.el.querySelector('p')!.textContent = this.project.desc;
    }
}

class ProjectList extends Component<HTMLDivElement> implements DragTarget {
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        
        this.config(); // projectState add the listener on the ProjectList
        this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();

            const listEl = this.el.querySelector('ul')!;
            listEl.classList.add('droppable');
        }
    }

    @autobind
    dropHandler(event: DragEvent) {
        const projectId = Number(event.dataTransfer!.getData('text/plain'));
        if (!isNaN(projectId)) {
            projectState.moveProject(
                projectId, 
                this.type === "active" 
                    ? ProjectStatus.Active
                    : ProjectStatus.Finished 
            );
        }

        const listEl = this.el.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    @autobind
    dragLeaveHandler(_: DragEvent) {
        const listEl = this.el.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }

    config() {
        this.el.addEventListener('dragover', this.dragOverHandler);
        this.el.addEventListener('drop', this.dropHandler);
        this.el.addEventListener('dragleave', this.dragLeaveHandler);

        projectState.addListeners((projects: Project[]) => {
            this.assignedProjects = projects.filter(project => {
                if (this.type === "active") {
                    return project.status === ProjectStatus.Active;
                }
                if (this.type === "finished") {
                    return project.status === ProjectStatus.Finished;
                } else {
                    return false;
                }
            });
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.el.querySelector('ul')!.id = listId;
        this.el.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const listEl = this.el.querySelector('ul')!;
        listEl.innerHTML = "";
        for (const project of this.assignedProjects) {
            new ProjectItem(this.el.querySelector('ul')!.id, project);
        }
    }
}

class ProjectInput extends Component<HTMLDivElement>{
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

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');