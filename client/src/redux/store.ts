import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import roomManagementReducer from "./features/roomManagement/roomManagementSlice";
import slotManagementReducer from "./features/slotManagement/slotManagementSlice";
import roomReducer from "./features/room/roomSlice";
import authReducer from "./features/auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

// Persist config for auth
const authPersistConfig = {
  key: "auth",
  storage,
};

// Persist config for room
const roomPersistConfig = {
  key: "room",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedRoomReducer = persistReducer(roomPersistConfig, roomReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    roomManagement: roomManagementReducer,
    slotManagement: slotManagementReducer,
    room: persistedRoomReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
