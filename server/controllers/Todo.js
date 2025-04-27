const mongoose = require('mongoose');
const Todo = require('../models/Todo');
const User = require('../models/User');

require('dotenv').config();

exports.createTodo = async (req, res) => {
    try {

        const {title, description} = req.body;
        const userId = req.user.id;

        if (!title) {
            return res.status(404).json({
                success: false,
                message: "Title is required!"
            })
        }

        const todo = await Todo.create({
            title: title,
            description: description? description: "",
        })

        const user = await User.findByIdAndUpdate(userId, {
            $push: {
                todos: todo._id
            }
        }, {new: true}).populate('todos').exec();

        return res.status(200).json({
            success: true,
            message: "Todo Created!",
            data: user
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.updateTodo = async (req, res) => {
    try {

        const {todoId, title, description, completed} = req.body;
        const userId = req.user.id;

        if (!todoId) {
            return res.status(404).json({
                success: false,
                message: "Todo Not Exists."
            })
        }

        await Todo.findByIdAndUpdate(todoId, {
            title: title, description: description, completed: completed
        });

        const user = await User.findById(userId).populate('todos').exec();

        return res.status(200).json({
            success: true,
            message: "Todo Updated",
            data: user
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

exports.deleteTodo = async (req, res) => {
    try {

        const {todoId} = req.body;
        const userId = req.user.id;

        if (!todoId) {
            return res.status(404).json({
                success: false,
                message: "Todo not exists."
            })
        }

        await Todo.findByIdAndDelete({_id: todoId}, {new: true});


        const user = await User.findByIdAndUpdate(userId, {
            $pull: {
                todos: todoId
            }
        }, {new: true}).populate('todos').exec();

        return res.status(200).json({
            success: true,
            message: "Todo Deleted.",
            data: user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message
        })
    }
}

exports.getTodos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const todos = await Todo.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalTodos = await Todo.countDocuments({});
        const totalPages = Math.ceil(totalTodos / limit);

        return res.status(200).json({
            success: true,
            message: "Todos retrieved successfully",
            data: {
                todos,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalTodos,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
