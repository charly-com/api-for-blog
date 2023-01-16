import express from "express";
import {Posting, updatePost, deletePost, getPost, getAllPosts} from '../controller/postController'

const router = express.Router();

router.post("/", Posting)
router.put("/:id", updatePost)
router.delete("/:id", deletePost)
router.get("/:id", getPost)
router.get("/", getAllPosts)



export default router;