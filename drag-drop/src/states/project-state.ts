import { Project, ProjectStatus } from "../models/project";
import { State } from "../models/state";

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

export const projectState = ProjectState.getInstance();