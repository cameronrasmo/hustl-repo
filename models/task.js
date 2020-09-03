const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        default: "",
    },
    project: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    board: {
        type: String,
        required: true,
        default: "backlog",
    },
});

module.exports = mongoose.model("Task", taskSchema);
