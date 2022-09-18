const express = require("express");
const router = express.Router();

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} = require(global.__approot + "/controllers/task-controller.js");

router.get("/", getAllTasks);
router.post("/", createTask);
router.get("/:taskId", getTask);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
