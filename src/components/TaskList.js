import Task from "./Task";

export default function TaskList({ tasks, onDeleteTask, onToggleTask }) {
  return (
    <ul className="list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
        />
      ))}
    </ul>
  );
}
