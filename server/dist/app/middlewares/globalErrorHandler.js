"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const handleZodError_1 = require("../errors/handleZodError");
const config_1 = __importDefault(require("../config"));
const handleValidationError_1 = require("../errors/handleValidationError");
const handleCastError_1 = require("../errors/handleCastError");
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const appError_1 = require("../errors/appError");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
    let message = err.message || 'Something went wrong!';
    let errorSource = [
        {
            path: '',
            message: 'Something went wrong!',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    else if (err.name === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    else if (err.name === 'CastError') {
        const simplifiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    else if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSource = simplifiedError.errorSource;
    }
    else if (err instanceof appError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorSource = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSource = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        stack: config_1.default.node_env === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
