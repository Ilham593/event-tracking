import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/events" }),
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => "/",
    }),
    getEventById: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetEventsQuery, useGetEventByIdQuery } = eventApi;
