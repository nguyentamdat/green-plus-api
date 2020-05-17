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