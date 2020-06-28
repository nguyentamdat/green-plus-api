import express from "express";
const router = express.Router();
import Device from "../models/Devices";
import { success, failure } from "../helper/response";

const callback = (req, res, next) => {
    return (err, result) => {
        // console.log(err, result);
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

router.post("/", (req, res, next) => {
    const deviceId = req.body.deviceId;
    Device.findOne({ id: deviceId }, callback(req, res, next));
});

router.post("/latest", (req, res, next) => {
    const deviceId = req.body.deviceId;
    Device.findOne({ id: deviceId }, (err, result) => {
        const data = result.log[result.log.length - 1] || [];
        return callback(req, res, next)(err, data);
    });
});

router.post("/range", (req, res, next) => {
    const { deviceId, from, to } = req.body;
    Device.findOne(
        {
            id: deviceId,
            "log.time": {
                $gte: new Date(from),
                $lt: new Date(to),
            },
        },
        callback(req, res, next)
    );
});

router.delete("/", (req, res, next) => {
    const deviceId = req.body.deviceId;
    Device.deleteOne({ _id: deviceId }, callback(req, res, next));
});

router.post("/config", (req, res, next) => {
    const { deviceId, min, max } = req.body;
    Device.update({ id: deviceId }, { min: min, max: max }, (err, result) => {
        if (err) {
            return res.send(failure(err));
        }
        return res.send(success(result));
    });
});

export default router;
