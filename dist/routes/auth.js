"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.post('/register', authController_1.Register);
router.post('/login', authController_1.Login);
router.post('/upload', multer_1.upload.single('file'), (req, res) => {
    res.status(200).json("File has been uploaded");
});
exports.default = router;
