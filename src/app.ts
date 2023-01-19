import express, {Request, Response} from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth';
import authUser from './routes/user';
import authPost from './routes/post';
import authCategory from './routes/categories';
import path from 'path';
dotenv.config();

const app = express();

app.use(express.json());
app.use(logger('dev'));
// app.use("/images", express.static(path.join(__dirname, "/images")))
  
mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECT_URL!, <MongoDBOptions>{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error: Error) => console.log(error.message));

app.use("/auth", authRoute)
app.use("/users", authUser)
app.use("/posts", authPost)
app.use("/category", authCategory)

app.listen(5000, () => {
    console.log('Server running on port 5000');
})

export default app;