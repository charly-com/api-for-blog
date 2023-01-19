import express from "express";
import { Register, Login } from "../controller/authController";
import { upload } from "../utils/multer";

const router = express.Router();


router.post('/register', Register)
router.post('/login', Login)
router.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json("File has been uploaded")
})

export default router;