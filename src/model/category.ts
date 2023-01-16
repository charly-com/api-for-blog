import mongoose, {Schema} from "mongoose";

interface categoryInstance {
    name: string;
}

const CategorySchema = new Schema({

    name: {
        type: String,
        required: true,
    },
})


const Category = mongoose.model<categoryInstance>('Category', CategorySchema);

export default Category;