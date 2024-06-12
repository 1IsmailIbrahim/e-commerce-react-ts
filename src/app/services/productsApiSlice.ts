import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct, IProductsResponse } from "../../interfaces";
import CookieService from "../../services/CookieService";

export const productsApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Product"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
  }),
  endpoints: (builder) => ({
    getDashboardProducts: builder.query<IProductsResponse, void>({
      query: () => {
        return {
          url: "/api/products?populate=thumbnail,categories&fields[0]=title&fields[2]=price&fields[1]=description&fields[3]=stock",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(
                ({ id }) => ({ type: "Product", id } as const)
              ),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    editProduct: builder.mutation<IProductsResponse, IProduct>({
      query: (data) => ({
        url: `/api/products/${data.id}`,
        method: "PUT",
        body: { data },
      }),
    }),
    deleteDashboardProduct: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetDashboardProductsQuery,
  useEditProductMutation,
  useDeleteDashboardProductMutation,
} = productsApiSlice;
