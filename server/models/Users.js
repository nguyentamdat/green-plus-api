import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UserSchema = new mongoose.Schema(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            dropDups: true,
            index: true,
        },
        password: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
        },
        _id: {
            type: String,
            default: uuidv4,
        },
        devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "devices" }],
    },
    { strict: false }
);
const User = mongoose.model("users", UserSchema);
export default User;
