const Todo = require("../models/Todo");

// find method to get all todos
const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//creating todo
const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Todo is required" });

    const todo = new Todo({ text });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// updating todo by id
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (text !== undefined) todo.text = text;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete todo by id
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllTodo, createTodo, updateTodo, deleteTodo };
