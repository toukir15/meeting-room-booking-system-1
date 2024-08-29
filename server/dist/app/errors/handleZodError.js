"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    const statusCode = 400;
    const errorSource = err.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        statusCode,
        message: 'Zod validation error.',
        errorSource,
    };
};
exports.handleZodError = handleZodError;
