import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const DeviceSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
        },
        name: String,
        type: String,
        configTopic: { type: String, required: true },
        listenTopic: { type: String, required: true },
        id: { type: String, unique: true, required: true },
        log: [{ values: [String], time: { type: Date, default: Date.now } }],
        min: [{ type: Number, default: 0 }],
        max: [{ type: Number, default: 0 }],
    },
    { strict: false }
);

const Device = mongoose.model("devices", DeviceSchema);
export default Device;
