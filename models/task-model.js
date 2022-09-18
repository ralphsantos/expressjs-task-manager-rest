const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        completedAt: Date,
        dueAt: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
