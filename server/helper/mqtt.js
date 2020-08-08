import mqtt from "mqtt";
import Devices from "../models/Devices";
require("dotenv").config();
import mongoose from "mongoose";
import Device from "../models/Devices";
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const client = mqtt.connect(process.env.MQTT_URI, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
});

client.on("connect", () => {
    console.log("Connected to BKU BROKER");
});

client.on("error", (err) => {
    console.log(err);
});

client.subscribe("Topic/#", { qos: 2 }, (err, granted) => {
    if (err) {
        console.log(err);
    } else {
        console.log(granted);
    }
});

setInterval(() => {
    console.log("Interval actived");
    Devices.aggregate(
        [{
            $project: {
                min: "$min",
                max: "$max",
                id: "$id",
                log: { $slice: ["$log", -1] },
            },
        }, ],
        (err, res) => {
            console.log(err);
            const checkInRange = (val, min, max) => val >= min && val <= max;
            res = res.map((item) => ({
                id: item.id,
                min: item.min,
                max: item.max,
                latest: item.log[0].values.map((x) => parseInt(x)),
            }));
            res = res
                .filter(
                    (item) =>
                    item.min &&
                    item.max &&
                    item.min.length > 0 &&
                    item.max.length > 0
                )
                .map((item) => [item.min, item.max, item.latest]);
            res = res.map((item) =>
                item[0].map((_, col) => item.map((x) => x[col]))
            );
            res = res.reduce((prev, curr) => prev.concat(curr), []);
            res = res.map((x) => checkInRange(x[2], x[0], x[1]));
            console.log(res);
            res = res.every((x) => x);
            if (!res) {
                client.publish(
                    "Topic/Speaker",
                    JSON.stringify([
                        { device_id: "Speaker", values: ["1", "3000"] },
                    ])
                );
                client.publish(
                    "Topic/LightD",
                    JSON.stringify([
                        { device_id: "LightD", values: ["1", "255"] },
                    ])
                );
            } else {
                client.publish(
                    "Topic/Speaker",
                    JSON.stringify([
                        { device_id: "Speaker", values: ["0", "3000"] },
                    ])
                );
                client.publish(
                    "Topic/LightD",
                    JSON.stringify([
                        { device_id: "LightD", values: ["0", "255"] },
                    ])
                );
            }
        }
    );
}, 5000);

client.on("message", async(topic, message, packet) => {
    try {
        const [msg] = JSON.parse(message);
        let doc = await Device.findOne({ id: msg.device_id });
        doc.log = await doc.log.slice(-500)
        await doc.log.push({ values: msg.values, time: Date.now() });
        await doc.save();
        // Devices.updateOne({ id: msg.device_id }, { $push: { log: { values: msg.values, time: Date.now() } } },
        //     (err, result) => {
        //         if (err) {
        //             return console.log(err);
        //         }
        //         //console.log(result);
        //     }
        // );
    } catch (e) {
        console.log(e);
    }
});