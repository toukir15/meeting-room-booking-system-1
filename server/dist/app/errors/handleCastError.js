"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err) => {
    const statusCode = 400;
    const errorSource = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        statusCode,
        message: 'Invalid ID.',
        errorSource,
    };
};
exports.handleCastError = handleCastError;
