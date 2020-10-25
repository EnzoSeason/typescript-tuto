export enum ProjectStatus {Active, Finished}

export class Project {
    static projectId = 0;
    constructor(
        public title: string,
        public desc: string,
        public people: number,
        public status: ProjectStatus,
        public id = ++Project.projectId,
    ){}
}