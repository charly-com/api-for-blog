import express from "express";
import { Update, Delete, Get } from "../controller/userController";

const router = express.Router();


router.put('/:id', Update)
router.delete('/:id', Delete)
router.get("/:id", Get)


export default router;