import React, { useState } from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import TodoItem from './models/todo.model';

const App: React.FC = () => {
  
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const todoAddHandler = (text: string) => {
    const item = new TodoItem(text);

    setTodos(previousItems => [...previousItems, item]); 
  };

  const todoDeleteHandler = (todoId: number) => {
    setTodos(previousTodos => 
      previousTodos.filter(todo => todo.id !== todoId));
  }

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler}/>
    </div>
  );
}

export default App;
