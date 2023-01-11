import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const app = express();


app.listen(5000, () => {
    console.log('Server running on port 5000');
})