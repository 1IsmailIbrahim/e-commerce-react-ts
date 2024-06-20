import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUsersResponse } from "../../interfaces";

export const usersApiSlice = createApi({
  reducerPath: "usersApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUsersResponse, void>({
      query: () => ({
        url: "/api/users",
        providesTags: ["User"],
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
