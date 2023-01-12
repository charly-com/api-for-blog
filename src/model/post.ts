import mongoose, {Schema} from "mongoose";

interface postInstance {
    title: string;
    desc: string;
    photo: string;
    username: string;
    categories: string[];
}

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: false,
    },
}, {
    timestamps: true,
})

const Post = mongoose.model<postInstance>('Post', PostSchema);

export default Post;