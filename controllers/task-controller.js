const TaskModel = require(global.__approot + "/models/task-model.js");
const asyncWrapper = require(global.__approot +
    "/middlewares/async-wrapper.js");

const getAllTasks = asyncWrapper((req, res, next) => {
    return TaskModel.find({}).then((tasks) =>
        res.status(201).json({ success: true, data: tasks })
    );
});

const getTask = asyncWrapper(async (req, res) => {
    const task = await TaskModel.findOne({ _id: req.params.taskId });
    if (!task) {
        return res
            .status(404)
            .json({ success: false, message: `Task does not exist` });
    }

    return res.status(200).json({ success: true, data: task });
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await TaskModel.create(req.body);

    return res.status(201).json({
        success: true,
        data: task,
    });
});

const updateTask = asyncWrapper(async (req, res) => {
    let newTaskData = req.body;
    if (newTaskData.completed === true) {
        newTaskData.completedAt = new Date();
    }

    const task = await TaskModel.findOneAndUpdate(
        { _id: req.params.taskId },
        req.body,
        { new: true, runValidators: true }
    );

    if (!task) {
        return res
            .status(404)
            .json({ success: false, message: `Task does not exist` });
    }

    return res.status(200).json({ success: true, data: task });
});

const deleteTask = asyncWrapper(async (req, res) => {
    const task = await TaskModel.findOneAndDelete({
        _id: req.params.taskId,
    });
    if (!task) {
        return res
            .status(404)
            .json({ success: false, message: `Task does not exist` });
    }

    return res.status(200).json({ success: true, data: task });
});

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};
