import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Logo from "./Logo";
import Clock from "./Clock";
import Quote from "./Quote";
import Form from "./Form";
import TaskList from "./TaskList";
import Stats from "./Stats";

export default function App() {
  const [tasks, setTasks] = useState( [] );
  const [date, setDate] = useState( "" );

  useEffect( () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setDate( today.toLocaleDateString( undefined, options ) );
  }, [] );

  function handleAddTask( task ) {
    setTasks( ( tasks ) => [...tasks, task] );
  }

  function handleDeleteTask( id ) {
    setTasks( ( tasks ) => tasks.filter( ( task ) => task.id !== id ) );
  }

  function handleToggleTask( id ) {
    setTasks( ( tasks ) =>
      tasks.map( ( task ) =>
        task.id === id ? { ...task, packed: !task.packed } : task
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm( "Are you sure you want to delete all tasks?" );
    if ( confirmed ) setTasks( [] );
  }

  return (
    <BrowserRouter basename="/to_do_list">
      <div className="date">{date}</div>
      <div className="clock-2">
      </div>



      <Logo />
      <Clock />
      <div className="app">

        <Form onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onToggleTask={handleToggleTask}
          onClearList={handleClearList}
        />


        {/* Container for Clock and Quote */}
        <div className="clock-quote-container">

          <Quote />
        </div>
        <Stats tasks={tasks} />
      </div>
    </BrowserRouter>
  );
}
