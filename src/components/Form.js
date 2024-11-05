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
      <h3 className="form-title">What do you want to accomplish today?</h3>
      <div className="form-group">
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task to your list..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="time"
          className="time-input"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button className="add-button">Add</button>
    </form>
  );
}
