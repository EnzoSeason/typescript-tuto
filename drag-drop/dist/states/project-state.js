"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectState = void 0;
const project_1 = require("../models/project");
const state_1 = require("../models/state");
class ProjectState extends state_1.State {
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
        const newProject = new project_1.Project(title, desc, numOfPeople, project_1.ProjectStatus.Active);
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
exports.projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map