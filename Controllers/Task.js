const express = require("express");

const crearTask = async (req, res = express.request) => {
  const task = new Task(req.body);

  try {
    task.user = req.uid;
    const saved = await task.save();
    res.json({
      ok: true,
      task: saved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Internal Error",
    });
  }
};

const listarTask = async (req, res = express.request) => {
  const tasks = await Task.find().populate("user", "name");

  try {
    res.status(200).json({
      ok: true,
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Internal Error",
    });
  }
};

const actualizarTask = async (req, res = express.request) => {
  const taskId = req.params.id;
  const uid = req.uid;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        ok: false,
        msg: "Task not found",
      });
    }

    if (task.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You can't edit this task",
      });
    }

    const newTask = {
      ...req.body,
      user: uid,
    };

    const updatedTask = await Task.findByIdAndUpdate(taskId, newTask, {
      new: true,
    });

    res.json({
      ok: true,
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Internal Error",
    });
  }
};

const eliminarTask = async (req, res = express.request) => {
  const taskId = req.params.id;
  const uid = req.uid;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        ok: false,
        msg: "Task not found",
      });
    }

    if (task.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You can't delete this task",
      });
    }

    await Task.findByIdAndDelete(taskId);

    res.json({
      ok: true,
      msg: "Task deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Internal Error",
    });
  }
};

module.exports = {
  crearTask,
  listarTask,
  actualizarTask,
  eliminarTask,
};
