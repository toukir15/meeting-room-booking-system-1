import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TSlot } from './slot.interace';

export const makeSlotFN = (payload: TSlot) => {
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
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'End time must be 60 min greater that start time',
    );
  }

  //   make a individual slot according the start time and end time
  const makeSlot = Array.from({ length: numberOfSlot }).map((_, index) => {
    const startTime = Number(payload.startTime.split(':')[0]) + index + ':00';
    const endTime =
      Number(payload.startTime.split(':')[0]) + (index + 1) + ':00';
    const slotData: TSlot = {
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
