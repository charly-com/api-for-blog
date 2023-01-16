import express, { Request, Response } from 'express';
import Post from "../model/post";


export const Posting = async (req: Request, res: Response) => {
    const newPost = new Post(req.body)

    try {
        const post = await newPost.save();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/post"
        });
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try {
        // Find post by id
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user trying to update the post is the owner of the post
        if (post.username !== req.body.username) {
            return res.status(403).json({ message: 'You can update only your own post' });
        }

        // update post
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        // return the updated post
        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
            route: '/post/:id'
        });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        // Find post by id
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if the user trying to delete the post is the owner of the post
        if (post.username !== req.body.username) {
            return res.status(403).json({ message: 'You can delete only your own post' });
        }

        // Delete post
        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Post deleted successfully' });

    } catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
            route: '/post/:id'
        });
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        } else{
            res.status(200).json(post);
        }

    } catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
            route: '/post/:id'
        });
    }

}

export const getAllPosts = async (req: Request, res: Response) => {
    
    const username = req.query.user;
    const catName = req.query.cat;

    try {
        let posts;
        if (username) {
            posts = await Post.find({username});
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                }
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
            route: '/post'
        });
    }
}