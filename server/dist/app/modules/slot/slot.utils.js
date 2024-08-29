"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSlotFN = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = require("../../errors/appError");
const makeSlotFN = (payload) => {
    const slotDuration = 60;
    //   extracted hour value
    const extractedStartTimeHourValue = Number(payload.startTime.split(':')[0]);
    const extractedEndTimeHourValue = Number(payload.endTime.split(':')[0]);
    //   convert hour into minute
    const startTimeConvertIntoMinute = extractedStartTimeHourValue * slotDuration;
    const endTimeConvertIntoMinute = extractedEndTimeHourValue * slotDuration;
    //   calculate total duration and number of slot
    const totalDuration = endTimeConvertIntoMinute - startTimeConvertIntoMinute;
    const numberOfSlot = totalDuration / slotDuration;
    if (totalDuration < 60) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'End time must be 60 min greater that start time');
    }
    //   make a individual slot according the start time and end time
    const makeSlot = Array.from({ length: numberOfSlot }).map((_, index) => {
        const startTime = Number(payload.startTime.split(':')[0]) + index + ':00';
        const endTime = Number(payload.startTime.split(':')[0]) + (index + 1) + ':00';
        const slotData = {
            room: payload.room,
            date: payload.date,
            startTime,
            endTime,
            isBooked: false,
        };
        return slotData;
    });
    return makeSlot;
};
exports.makeSlotFN = makeSlotFN;
