import { baseApi } from "../../api/baseApi";

const roomManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => {
        return {
          url: "/bookings",
          method: "GET",
        };
      },
    }),
    // createRoom: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/rooms",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["room"],
    // }),
    // updateRoom: builder.mutation({
    //   query: ({ data, id }) => {
    //     console.log({ data, id });
    //     return {
    //       url: `/rooms/${id}`,
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["room"],
    // }),
    // deleteRoom: builder.mutation({
    //   query: (id) => {
    //     return {
    //       url: `/rooms/${id}`,
    //       method: "DELETE",
    //     };
    //   },
    //   invalidatesTags: ["room"],
    // }),
  }),
});

export const { useGetBookingsQuery } = roomManagementApi;
