export default function Task({ task, onDeleteTask, onToggleTask }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.packed}
        onChange={() => onToggleTask(task.id)}
      />
      <span style={task.packed ? { textDecoration: "line-through" } : {}}>
        {task.description} {task.time}
      </span>
      <button onClick={() => onDeleteTask(task.id)}>❌</button>
    </li>
  );
}
