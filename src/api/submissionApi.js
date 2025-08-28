import { baseApi } from "./baseApi";

export const submissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitCode: builder.mutation({
      query: (data) => ({
        url: "submissions",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    pollResult: builder.query({
      query: (id) => `submissions/${id}`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useSubmitCodeMutation, usePollResultQuery } = submissionApi;
