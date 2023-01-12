import express, { Request, Response } from 'express';
import User from '../model/user';
import Post from '../model/post';
import bcrypt from 'bcrypt';


export const Update = async (req: Request, res: Response) => {
    try {
        if (req.body.userId !== req.params.id) {
            return res.status(403).json("You can update only your account");
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const updateUser = await User.findOneAndUpdate(
            { _id: req.params.id }, {
                $set: req.body
            }, {
                new: true
            }
        );

        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/:id"
        });
    }
}

export const Delete = async (req: Request, res: Response) => {
    try {
        if (req.body.userId !== req.params.id) {
            return res.status(403).json("You can delete only your account");
        }

        // Find the user by id
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json("User not found");
        }

        // Delete all posts related to the user
        await Post.deleteMany({username: user.username});

        // Delete the user
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "User and their posts deleted successfully" });

    } catch (err) {
        res.status(500).json({
            error: 'Internal Server Error',
            route: '/users/:id'
        });
    }
}

export const Get = async (req: Request, res: Response) => {
    try {
        // Find user by id
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // remove password from the user object before sending it to the client
        const { password, ...others } = user.toObject();

        res.status(200).json(others);
    } catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/users/:id"
        });
    }
}


