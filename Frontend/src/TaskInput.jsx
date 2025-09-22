export default function TaskInput({ newTask, setNewTask, addTask, loading }) {
  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Add new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        disabled={loading}
        style={{
          flex: 1,
          padding: "5px",
          border: "1px solid whitesmoke",
          borderRadius: "3px",
          marginRight: "5px",
        }}
      />
      <button
        onClick={addTask}
        disabled={loading}
        style={{
          padding: "6px 12px",
          border: "none",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>
  );
}
