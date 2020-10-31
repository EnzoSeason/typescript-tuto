export default class TodoItem {
    static todoId = 0;

    constructor(
        public text: string,
        public id = ++TodoItem.todoId
    ){}
}