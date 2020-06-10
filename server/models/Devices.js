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
        log: [{ value: [String], time: { type: Date, default: Date.now } }],
    },
    { strict: false }
);

const Device = mongoose.model("devices", DeviceSchema);
export default Device;
