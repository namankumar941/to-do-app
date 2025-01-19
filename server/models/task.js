const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskId: { type: String },
    userName: { type: String },
    taskDetails: {
      type: String, //required: true
    },
    dueDate: {
      type: Date,
      //required: true,
    },
    status: { type: String, default: "incomplete" },
    priority: { type: Number },
  },
  { timestamps: true }
);

const task = mongoose.model("task", taskSchema);

module.exports = task;
