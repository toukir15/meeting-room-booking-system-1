"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSlotFN = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = require("../../errors/appError");
const makeSlotFN = (payload) => {
    const maxSlots = 5;
    // Extract hour and minute values for start and end times
    const startHour = Number(payload.startTime.split(':')[0]);
    const startMinute = Number(payload.startTime.split(':')[1]);
    const endHour = Number(payload.endTime.split(':')[0]);
    const endMinute = Number(payload.endTime.split(':')[1]);
    // Calculate the duration of the slot in minutes
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    const slotDuration = endTotalMinutes - startTotalMinutes;
    if (slotDuration <= 0) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'End time must be greater than start time.');
    }
    const makeSlot = [];
    let currentStartMinutes = startTotalMinutes;
    for (let i = 0; i < maxSlots; i++) {
        const nextStartTotalMinutes = currentStartMinutes;
        const nextEndTotalMinutes = currentStartMinutes + slotDuration;
        // Convert back to hours and minutes
        const nextStartHour = Math.floor(nextStartTotalMinutes / 60);
        const nextStartMinute = nextStartTotalMinutes % 60;
        const nextEndHour = Math.floor(nextEndTotalMinutes / 60);
        const nextEndMinute = nextEndTotalMinutes % 60;
        // Break if the next slot would go past the 24-hour mark
        if (nextEndHour >= 24) {
            break;
        }
        const startTime = `${String(nextStartHour).padStart(2, '0')}:${String(nextStartMinute).padStart(2, '0')}`;
        const endTime = `${String(nextEndHour).padStart(2, '0')}:${String(nextEndMinute).padStart(2, '0')}`;
        makeSlot.push({
            room: payload.room,
            date: payload.date,
            startTime,
            endTime,
            roomNo: payload.roomNo,
            isBooked: false,
        });
        currentStartMinutes = nextStartTotalMinutes + slotDuration;
    }
    return makeSlot;
};
exports.makeSlotFN = makeSlotFN;
