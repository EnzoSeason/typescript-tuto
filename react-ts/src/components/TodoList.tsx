import React from 'react';
import TodoItem from '../models/todo.model';

interface TodoListProps {
    items: TodoItem[];
    onDeleteTodo: (todoId: number) => void;
}

const todoList: React.FC<TodoListProps> = props => {
    return <ul>
        {props.items.map(todo => 
            <li key={todo.id}>
                <span>{todo.text}</span>
                <button onClick={props.onDeleteTodo.bind(null, todo.id)}>DELETE</button>
            </li>)}
    </ul>;
};

export default todoList;