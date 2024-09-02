import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import roomManagementReducer from "./features/roomManagement/roomManagementSlice";
import slotManagementReducer from "./features/slotManagement/slotManagementSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    roomManagement: roomManagementReducer,
    slotManagement: slotManagementReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
