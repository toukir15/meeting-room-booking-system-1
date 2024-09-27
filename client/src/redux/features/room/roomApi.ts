import { baseApi } from "../../api/baseApi";

const roomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: (data) => {
        // Initialize an array to hold query parameters
        const params = [];

        // Add search parameter if present
        if (data?.search) {
          params.push(`search=${encodeURIComponent(data.search)}`);
        }

        // Add price range parameter if present
        if (data?.price) {
          const [priceMin, priceMax] = data.price.split("-");
          if (priceMin !== undefined) {
            params.push(`priceMin=${encodeURIComponent(priceMin)}`);
          }
          if (priceMax !== undefined) {
            params.push(`priceMax=${encodeURIComponent(priceMax)}`);
          }
        }

        // Add capacity range parameter if present
        if (data?.capacity) {
          const [capacityMin, capacityMax] = data.capacity.split("-");
          if (capacityMin !== undefined) {
            params.push(`capacityMin=${encodeURIComponent(capacityMin)}`);
          }
          if (capacityMax !== undefined) {
            params.push(`capacityMax=${encodeURIComponent(capacityMax)}`);
          }
        }

        // Add sort parameter if present
        if (data?.sort) {
          params.push(`sort=${encodeURIComponent(data.sort)}`);
        }

        // Construct the query string
        const queryString = params.length > 0 ? `?${params.join("&")}` : "";

        return {
          url: `/rooms${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["room"],
    }),
    getFeturedRooms: builder.query({
      query: () => {
        return {
          url: `/rooms`,
          method: "GET",
        };
      },
      providesTags: ["room"],
    }),
  }),
});

export const { useGetRoomsQuery, useGetFeturedRoomsQuery } = roomApi;
