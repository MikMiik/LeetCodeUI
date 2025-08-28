import { baseApi } from "./baseApi";

export const languagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLanguages: builder.query({
      query: () => "languages",
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllLanguagesQuery } = languagesApi;
