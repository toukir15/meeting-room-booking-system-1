import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => {
        return {
          url: "/users/signup",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
