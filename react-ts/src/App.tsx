import React from 'react';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const todos = [
    {id: "t1", text: "to do 1"},
    {id: "t2", text: "to do 2"},
  ];

  return (
    <div className="App">
      <TodoList items={todos}/>
    </div>
  );
}

export default App;
