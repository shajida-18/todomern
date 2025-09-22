export default function TaskItem({
  task,
  toggleTask,
  deleteTask,
  startEdit,
  saveEdit,
  cancelEdit,
  editTaskId,
  editText,
  setEditText,
}) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 0",
        borderBottom: "1px solid whitesmoke",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task)}
          style={{ marginRight: "8px" }}
        />
        {editTaskId === task._id ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{
              flex: 1,
              padding: "4px",
              border: "1px solid whitesmoke",
              borderRadius: "3px",
            }}
          />
        ) : (
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              flex: 1,
            }}
          >
            {task.text}
          </span>
        )}
      </div>

      <div style={{ marginLeft: "10px" }}>
        {editTaskId === task._id ? (
          <>
            <button
              onClick={() => saveEdit(task._id)}
              style={{
                marginRight: "5px",
                padding: "3px 6px",
                cursor: "pointer",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "3px",
              }}
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              style={{
                padding: "3px 6px",
                cursor: "pointer",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "3px",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => startEdit(task._id, task.text)}
              style={{
                marginRight: "5px",
                padding: "3px 6px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              style={{
                padding: "3px 6px",
                cursor: "pointer",
                color: "white",
                backgroundColor: "red",
                border: "none",
                borderRadius: "3px",
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
