"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = require("../utils/catchAsync");
const config_1 = __importDefault(require("../config"));
const appError_1 = require("../errors/appError");
const http_status_1 = __importDefault(require("http-status"));
// Update the role parameter to accept an array of roles
const auth = (roles) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const jwtToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!jwtToken) {
            throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        // Verify the JWT token
        const decoded = jsonwebtoken_1.default.verify(jwtToken, config_1.default.secret_key);
        // Check if the user's role is in the allowed roles
        if (!roles.includes(decoded.role)) {
            throw new appError_1.AppError(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
        // Attach the decoded user to the request object
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;
