const express = require('express');
const router = express.Router();

const { getTodos, getTodo, createTodo, deleteTodo, updateTodo } = require('../controllers/todoController');

router.delete('/:id', deleteTodo);
router.patch('/:id', updateTodo)
router.post('/', createTodo);
router.get('/:id', getTodo);
router.get('/', getTodos);

module.exports = router;