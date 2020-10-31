import React from 'react';

interface ToDoListProps {
    items: {    
        id: string;
        text: string; 
    }[]; 
}

const todoList: React.FC<ToDoListProps> = props => {
    return <ul>
        {props.items.map(todo => <li key={todo.id}>{todo.text}</li>)}
    </ul>;
};

export default todoList;