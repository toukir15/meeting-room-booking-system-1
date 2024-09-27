import { baseApi } from "../../api/baseApi";

const roomManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getManagementRooms: builder.query({
      query: () => {
        return {
          url: `/rooms/management/get-rooms`,
          method: "GET",
        };
      },
      providesTags: ["roomManagement"],
    }),
    createRoom: builder.mutation({
      query: (data) => {
        return {
          url: "/rooms",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["roomManagement"],
    }),
    updateRoom: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/rooms/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["roomManagement"],
    }),
    deleteRoom: builder.mutation({
      query: (id) => {
        return {
          url: `/rooms/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["roomManagement"],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetManagementRoomsQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} = roomManagementApi;
