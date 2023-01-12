import mongoose, {Schema} from "mongoose";

interface userInstance {
    username: string;
    email: string;
    password: string;
    profilePic: string;
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
},
{
    timestamps: true,
}
)

const User = mongoose.model<userInstance>('User', UserSchema);

export default User;