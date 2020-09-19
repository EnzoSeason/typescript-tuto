abstract class Departement {
    static showCompany() {
        console.log("test company");
    }

    constructor(private _name: string) {}

    abstract describe(): void;

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        this._name = newName;
    }
}

class ITSupport extends Departement {
    private static instance: ITSupport;
    static getInstance (): ITSupport {
        if (this.instance) { // "this" refers to the class ITSupport
            return this.instance;
        } else {
            this.instance = new ITSupport(["a"]);
            return this.instance;
        }
    }

    private constructor(public developpers: string[]) {
        super("IT");
    }

    describe(): void {
        console.log("Dep. IT");
    }
}

const it = ITSupport.getInstance();