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
    const { name, type, configTopic, listenTopic } = req.body;
    console.log(name, type);
});

export default router;
