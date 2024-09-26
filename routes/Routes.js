const express = require('express');
const { register, login, createTask, updateTask, deleteTask, getTasks, getTasksById, getUserById } = require('../controller/UserControllers');
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/create-task', createTask);

router.put('/update-task/:taskId', updateTask);

router.delete('/delete-task/:id', deleteTask);

router.get('/tasks/:id', getTasks);

router.get('/tasksby/:id', getTasksById);

router.get('/:userId', getUserById);


module.exports = router;
