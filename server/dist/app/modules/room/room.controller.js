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
exports.RoomControllers = void 0;
const room_service_1 = require("./room.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const createRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomData = JSON.parse(req === null || req === void 0 ? void 0 : req.body.data);
    const files = req.files;
    // const result = await RoomServices.createRoomIntoDB(roomData, files);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Room added successfully',
        data: 'result',
    });
}));
const getAllRooms = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield room_service_1.RoomServices.getAllRoomsFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Rooms retrieved successfully',
        data: result,
    });
}));
const getSingleRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield room_service_1.RoomServices.getSingleRoomFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Room retrieved successfully',
        data: result,
    });
}));
const updateRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const roomUpdateData = req.body;
    const { id } = req.params;
    const result = yield room_service_1.RoomServices.updateRoomIntoDB(id, roomUpdateData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Room updated successfully',
        data: result,
    });
}));
const deleteRoom = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield room_service_1.RoomServices.deleteRoomIntoDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Room deleted successfully',
        data: result,
    });
}));
exports.RoomControllers = {
    createRoom,
    getAllRooms,
    getSingleRoom,
    updateRoom,
    deleteRoom,
};
