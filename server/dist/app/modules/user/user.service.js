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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const appError_1 = require("../../errors/appError");
const config_1 = __importDefault(require("../../config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check user is exist or not
    const isUserExist = yield user_model_1.User.findOne({ email: payload.email });
    if (isUserExist) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'User is already exist');
    }
    // make password hash
    const salt = bcryptjs_1.default.genSaltSync(Number(config_1.default.bcrypt_salt_round));
    const hash = bcryptjs_1.default.hashSync(payload.password, salt);
    if (!hash) {
        throw new appError_1.AppError(http_status_1.default.CONFLICT, 'Conflict with user credantial');
    }
    payload.password = hash;
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ role: 'user' }).select({
        name: 1,
        email: 1,
        address: 1,
        phone: 1,
        role: 1,
    });
    return result;
});
const updateUserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, { role: 'admin' }, { new: true });
    return result;
});
exports.UserServices = {
    createUserIntoDB,
    getUserFromDB,
    updateUserIntoDB,
};
