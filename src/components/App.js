import { useState, useEffect } from "react";
import Logo from "./Logo";
import Form from "./Form";
import TaskList from "./TaskList";
import Stats from "./Stats";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setDate(today.toLocaleDateString(undefined, options));
  }, []);

  function handleAddTask(task) {
    setTasks((tasks) => [...tasks, task]);
  }

  function handleDeleteTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleToggleTask(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, packed: !task.packed } : task
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure you want to delete all tasks?");
    if (confirmed) setTasks([]);
  }

  return (
    <div className="app">
      <Logo />
      <div className="date">{date}</div> {/* Updated to use a div for styling */}
      <Form onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        onClearList={handleClearList}
      />
      <Stats tasks={tasks} />
    </div>
  );
}
