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
        configTopic: String,
        listenTopic: String,
        id: String,
        log: [{ value: String, time: Date }],
    },
    { strict: false }
);

const Device = mongoose.model("devices", DeviceSchema);
export default Device;
