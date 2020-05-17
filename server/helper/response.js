const success = (data, msg, statusCode) => {
    const body = {
        success: true,
        msg: msg || "",
        statusCode: statusCode || 0,
        data: data,
    };
    return body;
};
const failure = (msg, statusCode) => {
    const body = {
        success: false,
        msg: msg || "",
        statusCode: statusCode || 0,
        data: "",
    };
    return body;
};
const invalidParams = (statusCode) => {
    const body = {
        success: false,
        msg: "Params Error!",
        statusCode: statusCode || 0,
        data: "",
    };
    return body;
};
module.exports = { success, failure, invalidParams };
