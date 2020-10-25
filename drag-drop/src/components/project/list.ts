import { autobind } from "../../decorators/auto-bind";
import { DragTarget } from "../../models/drag-drop";
import { Project, ProjectStatus } from "../../models/project";
import { projectState } from "../../states/project-state";
import { ProjectItem } from "./item";

export class ProjectList extends Component<HTMLDivElement> implements DragTarget {
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