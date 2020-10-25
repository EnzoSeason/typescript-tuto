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