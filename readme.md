# API
## 1. Authorization
### Sign In
#### Request
```
    POST /api/auth/signin

    body: {
        phoneNumber: String,
        password: String
    }
```
#### Response
```
    body: {
        success: Boolean,
        msg: String, // message about error from server
        statusCode: Integer,
        data: JWT Token String
    }
```

### Sign Up
#### Request
```
    POST /api/auth/signup

    body: {
        phoneNumber: String,
        email: String,
        password: String
    }
```
#### Response
```
    body: {
        success: Boolean,
        msg: String, // message about error from server
        statusCode: Integer,
        data: JWT Token String
    }
```
## Device
### Get all devices
#### Request
```
    GET /api/device/all
```
#### Response
```
    body: {
        success: Boolean,
        msg: String, // message about error from server
        statusCode: Integer,
        data: [{
            "_id": "e1231152-2c9d-4267-8469-ff1fb5a870f4",
            "name": "TempHumi",
            "type": "5",
            "id": "TempHumi ",
            "configTopic": "Topic/TempHumi",
            "listenTopic": "Topic/TempHumi",
            "log": [
                {
                    "values": [
                        "27",
                        "39"
                    ],
                    "time": "2020-06-12T08:57:13.718Z"
                }
            ],
            "__v": 0
        }, ...]
    }
```
### Get device by _id
#### Request
```
    GET /api/device
    body: {
        "deviceId": "_id"
    }
```
#### Response
```
    body: {
        success: Boolean,
        msg: String, // message about error from server
        statusCode: Integer,
        data: {
            "_id": "e1231152-2c9d-4267-8469-ff1fb5a870f4",
            "name": "TempHumi",
            "type": "5",
            "id": "TempHumi ",
            "configTopic": "Topic/TempHumi",
            "listenTopic": "Topic/TempHumi",
            "log": [
                {
                    "values": [
                        "27",
                        "39"
                    ],
                    "time": "2020-06-12T08:57:13.718Z"
                }
            ],
            "__v": 0
        }
    }
```
### Config device
#### Request
```
    GET /api/device
    body: {
        "deviceId": "id",
        "msg": ["val1", "val2"]
    }
```
#### Response
```
    body: {
        success: Boolean,
        msg: String, // message about error from server
        statusCode: Integer,
        data: "Successfully"
    }
```