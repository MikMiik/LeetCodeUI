import { baseApi } from "./baseApi";

export const problemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProblems: builder.query({
      query: () => "problems",
      transformResponse: (response) => response.data,
    }),

    getProblem: builder.query({
      query: (id) => `problems/${id}`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllProblemsQuery, useGetProblemQuery } = problemApi;
