import React from 'react';

interface TodoListProps {
    items: {    
        id: string;
        text: string; 
    }[]; 
}

const todoList: React.FC<TodoListProps> = props => {
    return <ul>
        {props.items.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>;
};

export default todoList;