import { baseApi } from "../../api/baseApi";

const roomManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => {
        return {
          url: "/rooms",
          method: "GET",
        };
      },
      // transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
      //   return {
      //     data: response.data,
      //     meta: response.meta,
      //   };
      // },
    }),
    createRoom: builder.mutation({
      query: (data) => {
        return {
          url: "/rooms",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateRoomMutation, useGetRoomsQuery } = roomManagementApi;
