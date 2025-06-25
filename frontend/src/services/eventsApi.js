import { apiSlice } from "./apiSlice";

export const eventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/events",
      providesTags: ["Events"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetEventsQuery } = eventsApi;
