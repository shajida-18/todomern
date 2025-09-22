import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  loading,
  toggleTask,
  deleteTask,
  startEdit,
  saveEdit,
  cancelEdit,
  editTaskId,
  editText,
  setEditText,
}) {
  if (loading) {
    return <div style={{ textAlign: "center" }}>Loading tasks...</div>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          editTaskId={editTaskId}
          editText={editText}
          setEditText={setEditText}
        />
      ))}
    </ul>
  );
}
