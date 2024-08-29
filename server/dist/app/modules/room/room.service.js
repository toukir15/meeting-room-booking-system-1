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
exports.RoomServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = require("../../errors/appError");
const room_model_1 = require("./room.model");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const createRoomIntoDB = (roomData, files) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.create(roomData);
    files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const { secure_url } = yield (0, sendImageToCloudinary_1.sendImageToCloudinary)(file.filename, file.path);
        yield room_model_1.Room.findByIdAndUpdate(result._id, { $push: { images: secure_url } });
    }));
    return result;
});
const getAllRoomsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.find();
    return result;
});
const getSingleRoomFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_model_1.Room.findById(id);
    return result;
});
const updateRoomIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check is room exist or not
    const isRoomExist = yield room_model_1.Room.findById(id);
    if (!isRoomExist) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'Room is not exist');
    }
    const result = yield room_model_1.Room.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteRoomIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check is room exist or not
    const isRoomExist = yield room_model_1.Room.findById(id);
    if (!isRoomExist) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'Room is not exist');
    }
    const isDeleted = yield room_model_1.Room.findOne({ _id: id, isDeleted: true });
    // check room already deleted or not
    if (isDeleted) {
        throw new appError_1.AppError(http_status_1.default.CONFLICT, 'Room is already deleted');
    }
    const result = yield room_model_1.Room.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.RoomServices = {
    createRoomIntoDB,
    getAllRoomsFromDB,
    getSingleRoomFromDB,
    updateRoomIntoDB,
    deleteRoomIntoDB,
};
