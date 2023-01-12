"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = exports.Delete = exports.Update = void 0;
const user_1 = __importDefault(require("../model/user"));
const post_1 = __importDefault(require("../model/post"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Update = async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            return res.status(403).json("You can update only your account");
        }
        if (req.body.password) {
            const salt = await bcrypt_1.default.genSalt(10);
            req.body.password = await bcrypt_1.default.hash(req.body.password, salt);
        }
        const updateUser = await user_1.default.findOneAndUpdate({ _id: req.params.id }, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).json(updateUser);
    }
    catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/:id"
        });
    }
};
exports.Update = Update;
const Delete = async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            return res.status(403).json("You can delete only your account");
        }
        // Find the user by id
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json("User not found");
        }
        // Delete all posts related to the user
        await post_1.default.deleteMany({ username: user.username });
        // Delete the user
        await user_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User and their posts deleted successfully" });
    }
    catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
            route: '/users/:id'
        });
    }
};
exports.Delete = Delete;
const Get = async (req, res) => {
    try {
        // Find user by id
        const user = await user_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // remove password from the user object before sending it to the client
        const { password, ...others } = user.toObject();
        res.status(200).json(others);
    }
    catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/:id"
        });
    }
};
exports.Get = Get;
