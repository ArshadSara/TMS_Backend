const User = require('../models/UserModel');
const Task = require('../models/UserTask');

const register = async (req, res) => {
  try {
    const {email, password, fullName, phone } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    user = new User({ fullName, email, password, phone });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email' });
    if (user.password !== password) return res.status(400).json({ message: 'Invalid password' });
    res.status(200).json({userId : user._id, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createTask = async (req, res) => {
  try {
    const { title, description, status, userId } = req.body;
    const task = new Task({
      title,
      description,
      status,
      userId
    });
    await task.save();
    res.status(201).json({ message: 'Task created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      { _id: taskId, isDeleted: false },
      {
        title,
        description,
        status
      },
      { new: true }
    );
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    res.status(200).json({
      message: 'Task marked as deleted successfully',
      task: deletedTask
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getTasks = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.find({ userId: id, isDeleted: false });
    res.status(200).json({
      message: 'get List successfully',
      tasks
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasksById = async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await Task.find({ _id: id, isDeleted: false });
    res.status(200).json({
      message: 'successfully ',
      tasks
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const userInfo = await User.find({ _id: userId });
    res.status(200).json({
      message: 'successfully ',
      userInfo
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, createTask, updateTask, deleteTask, getTasks, getTasksById, getUserById };
