"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectList = void 0;
const auto_bind_1 = require("../../decorators/auto-bind");
const project_1 = require("../../models/project");
const project_state_1 = require("../../states/project-state");
const abstract_project_1 = require("./abstract-project");
const item_1 = require("./item");
class ProjectList extends abstract_project_1.Component {
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
            project_state_1.projectState.moveProject(projectId, this.type === "active"
                ? project_1.ProjectStatus.Active
                : project_1.ProjectStatus.Finished);
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
        project_state_1.projectState.addListeners((projects) => {
            this.assignedProjects = projects.filter(project => {
                if (this.type === "active") {
                    return project.status === project_1.ProjectStatus.Active;
                }
                if (this.type === "finished") {
                    return project.status === project_1.ProjectStatus.Finished;
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
            new item_1.ProjectItem(this.el.querySelector('ul').id, project);
        }
    }
}
__decorate([
    auto_bind_1.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    auto_bind_1.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    auto_bind_1.autobind
], ProjectList.prototype, "dragLeaveHandler", null);
exports.ProjectList = ProjectList;
//# sourceMappingURL=list.js.map