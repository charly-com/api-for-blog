import express, { Request, Response } from 'express';
import Category from "../model/category";


export const createCategory = async (req: Request, res: Response) => {
    const newCategory = new Category(req.body)

    try {
        const category = await newCategory.save();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/category"
        });
    }
}

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/category"
        });
    }
}