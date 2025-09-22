import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
const API_URL = "https://to-do-mern-9.onrender.com/api";

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
          width: "100%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>ToDo List</h2>

        <TaskInput
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
          loading={loading}
        />

        <TaskList
          tasks={tasks}
          loading={loading}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          editTaskId={editTaskId}
          editText={editText}
          setEditText={setEditText}
        />
      </div>
    </div>
  );
}
