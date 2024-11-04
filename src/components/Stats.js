export default function Stats({ tasks = [] }) {
  // If there are no tasks, show a motivational message
  if (!tasks.length)
    return (
      <p className="stats">
        <em>Let's accomplish the things we want to do today 🚀</em>
      </p>
    );

  const numTasks = tasks.length;
  const numPacked = tasks.filter((task) => task.packed).length;
  const percentage = Math.round((numPacked / numTasks) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything done today! 🎉"
          : `💼 You have ${numTasks} tasks on your list, and you've completed ${numPacked} (${percentage}%).`}
      </em>
    </footer>
  );
}
