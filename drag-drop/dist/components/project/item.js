"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectItem = void 0;
const auto_bind_1 = require("../../decorators/auto-bind");
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
    auto_bind_1.autobind
], ProjectItem.prototype, "dragStartHandler", null);
exports.ProjectItem = ProjectItem;
