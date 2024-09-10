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
      providesTags: ["slot"],
    }),
    createSlot: builder.mutation({
      query: (data) => {
        return {
          url: "/slots",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["slot"],
    }),
    deleteSlot: builder.mutation({
      query: (id) => {
        return {
          url: `/slots/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["slot"],
    }),
    updateSlot: builder.mutation({
      query: ({ date, id }) => {
        return {
          url: `/slots/${id}`,
          method: "PATCH",
          body: { date },
        };
      },
      invalidatesTags: ["slot"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useGetSlotsQuery,
  useDeleteSlotMutation,
  useUpdateSlotMutation,
} = slotManagement;
