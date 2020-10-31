import React from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const todos = [
    {id: "t1", text: "to do 1"},
    {id: "t2", text: "to do 2"},
  ];

  const todoAddHandler = (text: string) => {
    console.log(text);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler}/>
      <TodoList items={todos}/>
    </div>
  );
}

export default App;
