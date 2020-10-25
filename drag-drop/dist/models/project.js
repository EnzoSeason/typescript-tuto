"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.ProjectStatus = void 0;
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
class Project {
    constructor(title, desc, people, status, id = ++Project.projectId) {
        this.title = title;
        this.desc = desc;
        this.people = people;
        this.status = status;
        this.id = id;
    }
}
exports.Project = Project;
Project.projectId = 0;
//# sourceMappingURL=project.js.map