"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    const errorSource = Object.values(err.errors).map((val) => {
        return {
            path: val.path,
            message: val.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Moongoes validation error.',
        errorSource,
    };
};
exports.handleValidationError = handleValidationError;
