import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface IUser {
  identifier: string;
  password: string;
}

interface ILoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
export const LoginApiSlice = createApi({
  reducerPath: "login",
  tagTypes: ["login"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation<ILoginResponse, IUser>({
      query: (user) => {
        return {
          url: "/api/auth/local",
          method: "POST",
          body: user,
        };
      },
    }),
  }),
});

export const { useUserLoginMutation } = LoginApiSlice;
