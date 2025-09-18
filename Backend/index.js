const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const todoRoutes = require("./routes/todoRoutes");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.use(cors());
app.use(express.json());
app.use("/api", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
