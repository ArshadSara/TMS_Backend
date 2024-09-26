const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    isDeleted: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
