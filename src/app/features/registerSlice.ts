import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface IUser {
  email: string;
  username: string;
  password: string;
}

interface IRegisterResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
export const RegisterApiSlice = createApi({
  reducerPath: "register",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),
  endpoints: (builder) => ({
    userRegister: builder.mutation<IRegisterResponse, IUser>({
      query: (user) => {
        return {
          url: "/api/auth/local/register",
          method: "POST",
          body: user,
        };
      },
    }),
  }),
});

export const { useUserRegisterMutation } = RegisterApiSlice;
