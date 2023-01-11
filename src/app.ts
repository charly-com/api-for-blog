import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth';
dotenv.config();

const app = express();

app.use(express.json());
  
mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECT_URL!, <MongoDBOptions>{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error: Error) => console.log(error.message));

app.use("/auth", authRoute)

app.listen(5000, () => {
    console.log('Server running on port 5000');
})

export default app;