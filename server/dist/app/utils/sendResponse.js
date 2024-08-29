"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    return res
        .status(data.statusCode)
        .json({
        success: data.success,
        message: data.message,
        token: data.token,
        data: data.data,
    });
};
exports.sendResponse = sendResponse;
