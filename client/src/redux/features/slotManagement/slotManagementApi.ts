import { baseApi } from "../../api/baseApi";

const slotManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlots: builder.query({
      query: () => {
        return {
          url: "/slots",
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
    createSlot: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: "/slots",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateSlotMutation, useGetSlotsQuery } = slotManagement;
