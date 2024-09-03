import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RoomDetails {
  amenities: string[];
  availableQuantity: string;
  capacity: string;
  floorNo: string;
  images: string[];
  isDeleted: boolean;
  pricePerSlot: string;
  roomName: string;
  roomNo: string;
  _id: string;
}

export interface RoomState {
  room: RoomDetails | null;
}

const initialState: RoomState = {
  room: null,
};

export const roomSlice = createSlice({
  name: "roomManagement",
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<RoomDetails | null>) => {
      state.room = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;
