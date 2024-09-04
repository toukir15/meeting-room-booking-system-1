import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface user {
  email: string;
  role: string;
  iat: number;
  id: string;
  name: string;
  phone: string;
}

export interface userState {
  user: user | null;
}

const initialState: userState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<user | null>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
