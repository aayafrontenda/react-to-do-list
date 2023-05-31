import React, { useState } from 'react';
import Todo from './components/Todo';
import PlusIcon from './icons/plus.svg';
import formatDate from './utils/formatDate';
import separateCompleted from './utils/separeteCompleted';

function App() {
  const [addName, setAddName] = useState('');
  const [todos, setTodos] = useState([
    {
      id: '1',
      name: 'Do math homework', 
      description: 'Chapter 6.6, differential equations...', 
      deadline: formatDate(new Date()),
      completed: false,
      editable: true,
    },
    {
      id: '2',
      name: 'Do the dishes', 
      description: '(...)', 
      deadline: formatDate(new Date()),
      completed: false,
      editable: true,
    },
    {
      id: '3',
      name: 'Create a website', 
      description: '(use ui.dev guide)', 
      deadline: formatDate(new Date()),
      completed: false,
      editable: true,
    },
  ]);

  function addTodo(name) {
    setTodos((prevTodos) => separateCompleted([...prevTodos, {
      id: new Date().toString(),
      name: name,
      description: '(...)',
      deadline: formatDate(new Date()),
      completed: false,
      editable: true,
    }]));
    console.log(todos.map((todo) => todo.id));
  }

  return (
    <div className="App">
      <h1>to do list.</h1>
      <div className="to-do-container">
        <div className='add-row'>
        <input placeholder='Add new things to do here!' onChange={(e) => setAddName(e.target.value)} value={addName}></input>
        <button type='button' className='add-to-do' onClick={() => addTodo(addName)}>
          <img src={PlusIcon} style={{height: '15px', width: '15px'}} alt='add to-do'></img>
        </button>
        </div>
        {todos.map((todo) => 
          <div className='to-do'>
            <Todo todos={todos} todo={todo} setTodos={setTodos} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
