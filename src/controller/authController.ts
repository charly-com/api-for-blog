import express, { Request, Response } from 'express';
import User from '../model/user';
import bcrypt from 'bcrypt';




export const Register = async (req: Request, res: Response) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/auth/register"
        });
    }

}

export const Login = async (req: Request, res: Response) => {
    try {
        
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return res.status(404).json("User not found");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).json("Wrong password");
        }

        const { password, ...others } = user.toObject();

        res.status(200).json(others);

    } catch (err) {
        res.status(500).json({
            Error: "Internal Server Error",
            route: "/auth/login"
        });
    }
}

