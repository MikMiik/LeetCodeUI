import { baseApi } from "./baseApi";

export const tagApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: () => "tags",
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllTagsQuery } = tagApi;
