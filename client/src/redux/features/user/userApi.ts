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
    makeAdmin: builder.mutation({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["user"],
    }),
    getUsers: builder.query({
      query: () => {
        return {
          url: "/users",
          method: "GET",
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const { useCreateUserMutation, useGetUsersQuery, useMakeAdminMutation } =
  userApi;
