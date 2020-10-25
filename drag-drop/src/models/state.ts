export type ListenerFn<T> = (projects: T[]) => void;

export class State<T> {
    protected listeners: ListenerFn<T>[] = [];

    addListeners(fn: ListenerFn<T>) {
        this.listeners.push(fn);
    }
}