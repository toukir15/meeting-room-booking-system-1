import { jwtDecode } from "jwt-decode"; // Ensure correct import
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Define the structure of the decoded token (adjust based on your token structure)
interface DecodedToken {
  id: string;
  email: string;
  role: string;
  name: string;
  phone: string;
  iat: number;
}

// Base query that adds dispatch capability
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://meeting-room-booking-system-server.onrender.com/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `bearer ${token}`);
      }
      return headers;
    },
  });

  // Execute the standard base query
  const result = await baseQuery(args, api, extraOptions);

  // Access the token and dispatch, then decode the token
  const token = (api.getState() as RootState).auth.token;
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
      // Dispatch the user to the Redux store
      api.dispatch(setUser({ user: decoded, token }));
    } catch (error) {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth, // Use the custom base query
  tagTypes: ["slot", "room", "bookingManagement"],
  endpoints: () => ({}),
});
