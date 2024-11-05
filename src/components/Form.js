import { useState } from "react";

export default function Form({ onAddTask }) {
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("07:00");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newTask = {
      description,
      packed: false, // Initialize packed state
      time,
      id: Date.now(),
    };
    onAddTask(newTask);
    setDescription("");
    setTime("07:00");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>How many things do you want to accomplish today?</h3>
      <input
        type="text"
        className="task-input" // Update class name for styling
        placeholder="Add a new task to your list..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
