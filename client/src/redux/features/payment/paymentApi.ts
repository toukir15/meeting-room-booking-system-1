import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentSession: builder.mutation({
      query: (data) => {
        return {
          url: "/payments/create-payment",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useCreatePaymentSessionMutation } = paymentApi;
