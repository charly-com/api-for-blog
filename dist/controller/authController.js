"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const user_1 = __importDefault(require("../model/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Register = async (req, res) => {
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, salt);
        const newUser = new user_1.default({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/auth/register"
        });
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const user = await user_1.default.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json("User not found");
        }
        const validPassword = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json("Wrong password");
        }
        const { password, ...others } = user.toObject();
        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/auth/login"
        });
    }
};
exports.Login = Login;
