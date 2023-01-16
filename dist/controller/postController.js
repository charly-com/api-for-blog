"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = exports.getPost = exports.deletePost = exports.updatePost = exports.Posting = void 0;
const post_1 = __importDefault(require("../model/post"));
const Posting = async (req, res) => {
    const newPost = new post_1.default(req.body);
    try {
        const post = await newPost.save();
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/post"
        });
    }
};
exports.Posting = Posting;
const updatePost = async (req, res) => {
    try {
        // Find post by id
        const post = await post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Check if the user trying to update the post is the owner of the post
        if (post.username !== req.body.username) {
            return res.status(403).json({ message: 'You can update only your own post' });
        }
        // update post
        const updatedPost = await post_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        // return the updated post
        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
            route: '/post/:id'
        });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        // Find post by id
        const post = await post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Check if the user trying to delete the post is the owner of the post
        if (post.username !== req.body.username) {
            return res.status(403).json({ message: 'You can delete only your own post' });
        }
        // Delete post
        await post_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully' });
    }
    catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
            route: '/post/:id'
        });
    }
};
exports.deletePost = deletePost;
const getPost = async (req, res) => {
    try {
        const post = await post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        else {
            res.status(200).json(post);
        }
    }
    catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
            route: '/post/:id'
        });
    }
};
exports.getPost = getPost;
const getAllPosts = async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await post_1.default.find({ username });
        }
        else if (catName) {
            posts = await post_1.default.find({
                categories: {
                    $in: [catName]
                }
            });
        }
        else {
            posts = await post_1.default.find();
        }
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
            route: '/post'
        });
    }
};
exports.getAllPosts = getAllPosts;
