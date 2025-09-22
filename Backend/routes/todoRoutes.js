const express = require("express");
const router = express.Router();
const {
  getAllTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/todos", getAllTodo);
router.post("/todo/new", createTodo);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);
module.exports = router;
