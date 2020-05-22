import express from "express";
const router = express.Router();
import Device from "../models/Devices";
import { success, failure } from "../helper/response";

router.get("/all", (req, res, next) => {
    Device.find((err, result) => {
        if (err) return res.send(failure(err));
        return res.send(success(result));
    });
});

router.post("/create", (req, res, next) => {
    const { name, type, id, configTopic, listenTopic } = req.body;
    Device.create(
        { name, type, id, configTopic, listenTopic },
        (err, result) => {
            if (err) return res.send(failure(err));
            return res.send(success(result));
        }
    );
});

export default router;
