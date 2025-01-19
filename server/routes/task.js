const Task = require("../models/task");
const express = require("express");
const uuid = require("uuid");

const ChatGpt = require("../openAi/runAssistant");
const Interact = require("../interact/interact");
const router = express.Router();

//----------------------------------------------controller class----------------------------------------------

class TaskController {
  //function executed whenever new task is added to my to-do list----------
  async addTask(req, res) {
    if (!req.body.taskDetails || !req.body.dueDate) {
      // Validate the data
      return res
        .status(400)
        .json({ message: "User name and password are required" });
    }

    const oldToDoList = await Task.find({
      $and: [{ userName: req.body.userName }, { status: "incomplete" }],
    }).sort({
      priority: 1,
    });

    let priorityNo = 1;

    if (oldToDoList[0]) {
      const newEntry = {
        taskDetails: req.body.taskDetails,
        dueDate: new Date(req.body.dueDate).toLocaleDateString("en-GB"),
      };
      const priority = await chatGpt.chatGPT(oldToDoList, newEntry); //piority check from openAI
      priorityNo = parseFloat(priority / 2);
    }
    await Task.create({
      //new task created in database
      taskId: uuid.v4(),
      userName: req.body.userName,
      taskDetails: req.body.taskDetails,
      dueDate: req.body.dueDate,
      priority: priorityNo,
    });

    const myToDoList = await Task.find({
      $and: [{ userName: req.body.userName }, { status: "incomplete" }],
    }).sort({
      priority: 1,
    });

    res.send({
      //send response to UI
      user: req.body.userName,
      myToDoList: myToDoList,
    });
  }

  //function executed whenever task is deleted from my to-do list----------
  async deleteTask(req, res) {
    await Task.deleteOne({ taskId: req.body.taskId }); //task deleted

    const myToDoList = await Task.find({
      $and: [{ userName: req.body.userName }, { status: "incomplete" }],
    }).sort({
      priority: 1,
    });

    res.send({
      myToDoList: myToDoList,
    });
  }

  //function executed whenever task is marked as completed----------
  async taskCompleted(req, res) {
    const interact = new Interact( // create instance of class to interact with blockchain
      req.body.taskDetails,
      new Date().toLocaleDateString("en-GB")
    );

    if (interact.sendTx()) {
      //if task added to blockchain than marked as completed in my database
      await Task.findOneAndUpdate(
        { taskId: req.body.taskId },
        { $set: { status: "completed", dueDate: Date.now() } }
      );
    }

    const completedTask = await Task.find({
      $and: [{ userName: req.body.userName }, { status: "completed" }],
    }).sort({
      dueDate: 1,
    });

    const myToDoList = await Task.find({
      $and: [{ userName: req.body.userName }, { status: "incomplete" }],
    }).sort({
      priority: 1,
    });

    res.send({
      completedTask: completedTask,
      myToDoList: myToDoList,
    });
  }

  //function executed whenever to-do task is edited------------
  async editTask(req, res) {
    const oldToDoList = await Task.find(
      {
        $and: [{ userName: req.body.userName }, { status: "incomplete" }],
      },
      "taskDetails , dueDate , priority"
    ).sort({
      priority: 1,
    });

    let priorityNo = 1;

    if (oldToDoList.length != 1) {
      //if my to-do list have more then one task then ask priority from openAi
      const newEntry = {
        taskDetails: req.body.taskDetails,
        dueDate: new Date(req.body.dueDate).toLocaleDateString("en-GB"),
      };

      const priority = await chatGpt.chatGPT(oldToDoList, newEntry);
      priorityNo = parseFloat(priority / 2);
    }

    await Task.updateOne(
      { taskId: req.body.taskId },
      {
        $set: {
          taskDetails: req.body.taskDetails,
          dueDate: req.body.dueDate,
          priority: priorityNo,
        },
      }
    );

    const myToDoList = await Task.find({
      $and: [{ userName: req.body.userName }, { status: "incomplete" }],
    }).sort({
      priority: 1,
    });

    res.send({
      myToDoList: myToDoList,
    });
  }

  //function executed whenever task is to be verified from blockchain------------
  async verifyTask(req, res) {
    const interact = new Interact( // create instance of class to interact with blockchain
      req.body.taskDetails,
      req.body.completionDate
    );

    const bool = await interact.verify();
    res.send({
      bool: bool,
    });
  }
}

//created class instance
const chatGpt = new ChatGpt();
const taskController = new TaskController();

//----------------------------------------------routes----------------------------------------------

router.post("/add", taskController.addTask.bind(taskController));
router.post("/delete", taskController.deleteTask.bind(taskController));
router.post("/completed", taskController.taskCompleted.bind(taskController));
router.post("/edit", taskController.editTask.bind(taskController));
router.post("/verify", taskController.verifyTask.bind(taskController));

module.exports = router;
