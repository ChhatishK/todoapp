const express = require('express');
const { createTodo, updateTodo, deleteTodo, getTodos } = require('../controllers/Todo');
const { auth, isClient, isAdmin } = require('../middlewares/auth');
const router = express.Router();


router.post('/create-todo', auth, isClient, createTodo);
router.post('/update-todo', auth, isClient, updateTodo);
router.delete('/delete-todo', auth, isClient, deleteTodo);

router.get('/view-todos', auth, isAdmin, getTodos);

module.exports = router;