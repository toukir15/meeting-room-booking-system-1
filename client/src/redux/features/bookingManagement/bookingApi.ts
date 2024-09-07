import { baseApi } from "../../api/baseApi";

const bookingManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => {
        return {
          url: "/bookings/get-bookings",
          method: "GET",
        };
      },
      providesTags: ["bookingManagement"],
    }),

    approveBooking: builder.mutation({
      query: (id) => {
        return {
          url: `/bookings/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["bookingManagement"],
    }),

    rejectBooking: builder.mutation({
      query: (id) => {
        return {
          url: `/bookings/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["bookingManagement"],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useApproveBookingMutation,
  useRejectBookingMutation,
} = bookingManagementApi;
