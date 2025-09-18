import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = " https://to-do-mern-4.onrender.com/api";
// Backend API URL

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetching  all todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTasks(response.data);
    } catch (error) {
      alert("Failed to fetch todos");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Adding new task or tofo
  const addTask = async () => {
    if (!input.trim()) return;
    try {
      await axios.post(`${API_URL}/todo/new`, { text: input.trim() });
      setInput("");
      fetchTodos();
    } catch (error) {
      alert("Failed to add todo");
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/todo/${id}`);
      fetchTodos();
    } catch (error) {
      alert("Failed to delete todo");
      console.error(error);
    }
  };
  //updating
  const toggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/todo/${task._id}`, {
        completed: !task.completed,
      });
      fetchTodos();
    } catch (error) {
      alert("Failed to update todo");
      console.error(error);
    }
  };

  // editing
  const startEdit = (id, currentText) => {
    setEditTaskId(id);
    setEditInput(currentText);
  };

  // Save edit
  const saveEdit = async (id) => {
    if (!editInput.trim()) return;
    try {
      await axios.put(`${API_URL}/todo/${id}`, { text: editInput.trim() });
      setEditTaskId(null);
      setEditInput("");
      fetchTodos();
    } catch (error) {
      alert("Failed to update todo");
      console.error(error);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditTaskId(null);
    setEditInput("");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ background: "#fff", height: "100vh", width: "100vw" }}
    >
      <div
        className="card  p-4"
        style={{ minWidth: "400px", maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center mb-4">ToDo List</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            disabled={loading}
          />
          <button
            className="btn btn-primary"
            onClick={addTask}
            disabled={loading}
          >
            Add
          </button>
        </div>
        {loading ? (
          <div className="text-center">Loading tasks...</div>
        ) : (
          <ul className="list-group">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="list-group-item d-flex align-items-center justify-content-between"
              >
                <div className="d-flex align-items-center flex-grow-1">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                  />
                  {editTaskId === task._id ? (
                    <input
                      type="text"
                      className="form-control w-75"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(task._id)}
                    />
                  ) : (
                    <span
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        fontSize: "1.1rem",
                      }}
                    >
                      {task.text}
                    </span>
                  )}
                </div>
                <div>
                  {editTaskId === task._id ? (
                    <>
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={() => saveEdit(task._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => startEdit(task._id, task.text)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteTask(task._id)}
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
