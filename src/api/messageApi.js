import { baseApi } from "./baseApi";

export const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessages: builder.query({
      query: () => "messages",
      transformResponse: (response) => response.data,
    }),

    createMessage: builder.mutation({
      query: (data) => ({
        url: "messages",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllMessagesQuery, useCreateMessageMutation } = messagesApi;
