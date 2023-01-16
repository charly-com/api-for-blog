"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controller/postController");
const router = express_1.default.Router();
router.post("/", postController_1.Posting);
router.put("/:id", postController_1.updatePost);
router.delete("/:id", postController_1.deletePost);
router.get("/:id", postController_1.getPost);
router.get("/", postController_1.getAllPosts);
exports.default = router;
