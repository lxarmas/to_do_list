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
    const options = { year: "numeric", month: "long", day: "numeric" };
    setDate( today.toLocaleDateString( undefined, options ) );
  }, [] );

  const handleAddTask = ( task ) => setTasks( ( prev ) => [...prev, task] );
  const handleDeleteTask = ( id ) => setTasks( ( prev ) => prev.filter( ( task ) => task.id !== id ) );
  const handleToggleTask = ( id ) =>
    setTasks( ( prev ) => prev.map( ( task ) => ( task.id === id ? { ...task, packed: !task.packed } : task ) ) );
  const handleClearList = () => {
    if ( window.confirm( "Are you sure you want to delete all tasks?" ) ) setTasks( [] );
  };

  return (
    <BrowserRouter basename="/to_do_list">
      <div className="app">
        <Logo />
        <Form onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleTask={handleToggleTask} onClearList={handleClearList} />
        <div className="date">{date}</div>
        <div className="clock-quote-container">
          <Clock />
          <Quote />
        </div>
        <Stats tasks={tasks} />
      </div>
    </BrowserRouter>
  );
}
