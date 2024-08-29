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
exports.SlotServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = require("../../errors/appError");
const slot_model_1 = require("./slot.model");
const slot_utils_1 = require("./slot.utils");
const createSlotIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const makeSlot = (0, slot_utils_1.makeSlotFN)(payload);
    // Retrieve existing slots from the database for the given room
    const existingSlots = yield slot_model_1.Slot.find({ room: makeSlot[0].room }).lean();
    // Check for duplicates based on startTime or endTime
    const duplicates = makeSlot.filter((newSlot) => existingSlots.some((existingSlot) => existingSlot.startTime === newSlot.startTime ||
        existingSlot.endTime === newSlot.endTime));
    // Throw error if all provided slots are duplicates
    if (duplicates.length === makeSlot.length) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'All provided slots already exist.');
    }
    // Filter out the unique slots
    const uniqueSlots = makeSlot.filter((newSlot) => !existingSlots.some((existingSlot) => existingSlot.startTime === newSlot.startTime &&
        existingSlot.endTime === newSlot.endTime));
    // Insert the unique slots into the database
    const result = yield slot_model_1.Slot.insertMany(uniqueSlots);
    return result;
});
const getAvailableAllSlotFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, roomId } = query;
    const slotQuery = { isBooked: false };
    // check date for add date query
    if (date) {
        slotQuery.date = date;
    }
    // check roomId for add roomId query
    if (roomId) {
        slotQuery.room = roomId;
    }
    const result = yield slot_model_1.Slot.find(slotQuery).populate('room');
    return result;
});
exports.SlotServices = {
    createSlotIntoDB,
    getAvailableAllSlotFromDB,
};
