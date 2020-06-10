import express from "express";
const router = express.Router();
import Device from "../models/Devices";
import { success, failure } from "../helper/response";

const callback = (req, res, next) => {
    return (err, result) => {
        consolog.log(err, result);
        if (err) return res.send(failure(err));
        return res.send(success(result));
    };
};

router.get("/all", (req, res, next) => {
    Device.find(callback(req, res, next));
});

router.post("/create", (req, res, next) => {
    const { name, type, id, configTopic, listenTopic } = req.body;
    Device.create(
        { name, type, id, configTopic, listenTopic },
        callback(req, res, next)
    );
});

router.get("/", (req, res, next) => {
    const deviceId = req.body.deviceId;
    Device.findById(deviceId, callback(req, res, next));
});

router.get("/latest", (req, res, next) => {
    const deviceId = req.body.deviceId;
    Device.findById(deviceId, (err, result) => {
        const data = result.log[0] || [];
        return callback(req, res, next)(err, data);
    });
});

router.get("/range", (req, res, next) => {
    const { deviceId, from, to } = req.body;
    Device.find(
        {
            _id: deviceId,
            log: {
                $elemMatch: {
                    time: { $gte: new Date(from), $lt: new Date(to) },
                },
            },
        },
        callback(req, res, next)
    );
});

router.delete("/", (req, res, next) => {
    const deviceId = req.body.deviceId;
    Device.deleteOne({ _id: deviceId }, callback(req, res, next));
});

export default router;
