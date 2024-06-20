import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct, IProductsResponse } from "../../interfaces";
import CookieService from "../../services/CookieService";

export const productsApiSlice = createApi({
  reducerPath: "productsApi",
  tagTypes: ["Product"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
  }),
  endpoints: (builder) => ({
    getDashboardProducts: builder.query<IProductsResponse, void>({
      query: () => ({
        url: "/api/products?populate=thumbnail,categories&fields[0]=title&fields[2]=price&fields[1]=description&fields[3]=stock",
      }),
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
    editProduct: builder.mutation<IProduct, { id: number; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body: body,
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
      }),
      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        // Ensure id is defined
        if (id === undefined) return;
        const patchResult = dispatch(
          productsApiSlice.util.updateQueryData(
            "getDashboardProducts",
            undefined,
            (draft) => {
              const productIndex = draft.data.findIndex(
                (product) => product.id === id
              );
              if (productIndex !== -1) {
                draft.data[productIndex].attributes = {
                  ...draft.data[productIndex].attributes,
                  ...body,
                };
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Product"],
    }),
    addDashboardProduct: builder.mutation<IProduct, FormData>({
      query: (body) => ({
        url: `/api/products/`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
        body: body,
      }),
      invalidatesTags: ["Product"],
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
  useAddDashboardProductMutation,
  useDeleteDashboardProductMutation,
} = productsApiSlice;
