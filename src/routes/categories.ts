import express from "express";
import { createCategory, getAllCategories } from "../controller/categoryController";

const router = express.Router();

router.post("/", createCategory)
router.get("/", getAllCategories)

export default router;