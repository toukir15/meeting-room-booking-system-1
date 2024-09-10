import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableSlot: builder.query({
      query: ({ roomId, date }) => {
        return {
          url: `/slots/availability?roomId=${roomId}&date=${date}`,
          method: "GET",
        };
      },
      providesTags: ["slot"],
    }),
  }),
});

export const { useGetAvailableSlotQuery } = slotApi;
