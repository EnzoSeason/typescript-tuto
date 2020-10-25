"use strict";
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
