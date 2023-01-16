"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = exports.createCategory = void 0;
const category_1 = __importDefault(require("../model/category"));
const createCategory = async (req, res) => {
    const newCategory = new category_1.default(req.body);
    try {
        const category = await newCategory.save();
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/category"
        });
    }
};
exports.createCategory = createCategory;
const getAllCategories = async (req, res) => {
    try {
        const categories = await category_1.default.find();
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/category"
        });
    }
};
exports.getAllCategories = getAllCategories;
