import React, { useState } from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import TodoItem from './models/todo.model';

const App: React.FC = () => {
  // const todos = [
  //   {id: "t1", text: "to do 1"},
  //   {id: "t2", text: "to do 2"},
  // ];
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const todoAddHandler = (text: string) => {
    const item = {
      id: Math.random().toString(),
      text: text
    }
    setTodos(previousItems => [...previousItems, item]); 
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler}/>
      <TodoList items={todos}/>
    </div>
  );
}

export default App;
