import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface slotDetails {
  roomName: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  _id: string;
}

export interface SlotState {
  slot: slotDetails | null;
}

const initialState: SlotState = {
  slot: null,
};

export const slotManagementSlice = createSlice({
  name: "slotManagement",
  initialState,
  reducers: {
    setSlot: (state, action: PayloadAction<slotDetails | null>) => {
      state.slot = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSlot } = slotManagementSlice.actions;

export default slotManagementSlice.reducer;
