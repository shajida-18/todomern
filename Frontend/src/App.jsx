import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const API_URL = "https://to-do-mern-4.onrender.com/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/todos`);
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (!newTask.trim()) return;
    await fetch(`${API_URL}/todo/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTask.trim() }),
    });
    setNewTask("");
    getTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/todo/${id}`, { method: "DELETE" });
    getTasks();
  };

  const toggleTask = async (task) => {
    await fetch(`${API_URL}/todo/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    getTasks();
  };

  const startEdit = (id, text) => {
    setEditTaskId(id);
    setEditText(text);
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) return;
    await fetch(`${API_URL}/todo/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editText.trim() }),
    });
    setEditTaskId(null);
    setEditText("");
    getTasks();
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditText("");
  };

  return (
    <div
      style={{
        backgroundColor: "skyblue",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          minWidth: "300px",
          maxWidth: "500px",
          width: "100%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>ToDo List</h2>

        <div style={{ display: "flex", marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Add new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            disabled={loading}
            style={{
              flex: 1,
              padding: "6px",
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

        {loading ? (
          <div style={{ textAlign: "center" }}>Loading tasks...</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks.map((task) => (
              <li
                key={task._id}
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
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
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
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
