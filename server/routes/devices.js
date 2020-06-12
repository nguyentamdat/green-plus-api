import express from "express";
const router = express.Router();
import Device from "../models/Devices";
import { success, failure } from "../helper/response";
import mqtt from "mqtt";

const callback = (req, res, next) => {
    return (err, result) => {
        console.log(err, result);
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
    const { deviceId, msg } = req.body;
    const mes = { device_id: deviceId, values: msg };
    const client = mqtt.connect("tcp://13.76.250.158:1883", {
        username: "BKvm2",
        password: "Hcmut_CSE_2020",
    });
    const configTopic = Device.findOne({ id: deviceId }).exec().configTopic;
    client.publish(configTopic, mes);
    client.end(true);
});

export default router;
