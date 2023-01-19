"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const post_1 = __importDefault(require("./routes/post"));
const categories_1 = __importDefault(require("./routes/categories"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// app.use("/images", express.static(path.join(__dirname, "/images")))
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(process.env.CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error.message));
app.use("/auth", auth_1.default);
app.use("/users", user_1.default);
app.use("/posts", post_1.default);
app.use("/category", categories_1.default);
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
exports.default = app;
