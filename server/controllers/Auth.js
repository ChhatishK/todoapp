const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Todo = require('../models/Todo');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {

        const {fullName, email, phoneNumber, password, accountType} = req.body;

        if (!fullName || !email || !phoneNumber || !password || !accountType) {
            return res.status(404).json({
                success: false,
                message: "All fields are required!"
            })
        }

        let user = await User.findOne({email});

        if (user) {
            return res.status(203).json({
                success: false,
                message: "User already exists! Change email."
            })
        }

        user = await User.create({
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            accountType: accountType
        });

        if (!user) {
            return res.status(203).json({
                success: false,
                message: "Account not Created!"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Account Created",
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

exports.login = async (req, res) => {
    try {

        const {email, password} = req.body;

        // console.log(req.body);

        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "All fields are required!"
            })
        }

        let user = await User.findOne({email: email, password: password}).populate("todos").exec();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Wrong email or password."
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "10h"});

        user = user.toObject();
        user.token = token;

        const options = {
            httpOnly: true,
            expires: new Date(Date.now() + 10*60*60*1000)
        }

        res.cookie("token", token, options).status(200).json({
            success: true,
            message: "User logged in.",
            user,
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