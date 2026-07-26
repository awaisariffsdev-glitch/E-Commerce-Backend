const { default: mongoose } = require("mongoose");
const User = require("../model/user.models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
    try {
        const { email, fullname, contact, password } = req.body;
        if (!email || !fullname || !password) {
            return res.status(400).json({
                message: "All Fileds Are Required"
            })
        }


        const userFind = await User.findOne({ email });
        if (userFind) {
            return res.status(409).json({
                message: "User Already Existed"
            })
        }


        const hashPassword = await bcrypt.hash(password, 13);

        const newUser = new User({
            email,
            fullname,
            contact,
            image: req.file ? req.file.path : null,
            password: hashPassword
        });


        await newUser.save();

        return res.status(201).json({
            message: "User Registered Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Somethings wents Wrong"
        })
    }
}

const userUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const { email, fullname, contact, password } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Id is required"
            })
        }
        const hashPassword = await bcrypt.hash(password, 13);
        const userFind = await User.findByIdAndUpdate(id, { email, fullname, contact, password: hashPassword, image: req.file ? req.file.path : null, });

        return res.status(200).json({
            message: "User Is Updated Successfully",
            userFind
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server Error"
        })
    }
}

const userLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All Fields Are Required"
            })
        }

        const userFind = await User.findOne({ email });
        if (!userFind) {
            return res.status(400).json({
                message: "Email and Password is Incorrect"
            })
        }


        const isCompare = await bcrypt.compare(password, userFind.password);
        if (!isCompare) {
            return res.status(400).json({
                message: "Email and Password is Incorrect"
            })
        }


        const payload = {
            email,
            fullname: userFind.fullname
        };

        const SCRECT_KEY = process.env.SCRECT_KEY;

        const token = await jwt.sign(payload, SCRECT_KEY, { expiresIn: "7h" });


        return res.status(200).json({
            message: "User LoggedIn Successfully",
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Somethings wents Wrong"
        })
    }
}

module.exports = {
    userSignUp, userLogIn, userUpdate
}