import { autobind } from "../../decorators/auto-bind";
import { Draggable } from "../../models/drag-drop";
import { Project } from "../../models/project";
import { Component } from "./abstract-project";

export class ProjectItem extends Component<HTMLUListElement> implements Draggable {
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