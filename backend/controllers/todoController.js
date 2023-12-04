const Todo = require("../models/todo");

const getTodos = async (req, res) => {
    try {
        let todos = await Todo.find({ userId: req.user });
        res.status(200).json(todos);
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "failure" });
    }
}

const getTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOne({ _id: id, userId: req.user });
        res.status(200).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failure" });
    }
}

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        await Todo.create({ title, description, userId: req.user });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "failure" });
    }
}

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        await Todo.findOneAndUpdate({ _id: id, userId: req.user }, {
            title, description, updatedAt: Date.now()
        });
        res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "failure" });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user });
        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 'failure' });
    }
}

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo };