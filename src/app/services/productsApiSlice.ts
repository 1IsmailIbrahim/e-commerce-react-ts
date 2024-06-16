import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory, IProduct, IProductsResponse } from "../../interfaces";
import CookieService from "../../services/CookieService";

export interface ICategoryResponse {
  data: ICategory[];
}
export const productsApiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Product", "Category"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
  }),
  endpoints: (builder) => ({
    // Products Api
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
    // Categories Api
    getCategories: builder.query<ICategoryResponse, void>({
      query: () => ({
        url: "/api/categories",
        providesTags: ["Category"],
      }),
    }),
    editCategories: builder.mutation<ICategory, { id: number; title: string }>({
      query: ({ id, title }) => ({
        url: `/api/products/${id}`,
        method: "PUT",
        body: { title },
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
      }),
      async onQueryStarted({ id, title }, { dispatch, queryFulfilled }) {
        if (id === undefined) return;
        const patchResult = dispatch(
          productsApiSlice.util.updateQueryData(
            "getCategories",
            undefined,
            (draft) => {
              const categoryIndex = draft.data.findIndex(
                (cat) => cat.id === id
              );
              if (categoryIndex !== -1) {
                draft.data[categoryIndex].attributes.title = title;
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
      invalidatesTags: ["Category"],
    }),
    addCategory: builder.mutation<ICategory, { title: string }>({
      query: ({ title }) => ({
        url: `/api/categories/`,
        method: "POST",
        body: { title },
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
      }),
      async onQueryStarted({ title }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productsApiSlice.util.updateQueryData(
            "getCategories",
            undefined,
            (draft) => {
              draft.data.push({
                id: draft.data.length + 1,
                attributes: {
                  title,
                },
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetDashboardProductsQuery,
  useEditProductMutation,
  useDeleteDashboardProductMutation,
  useGetCategoriesQuery,
  useAddDashboardProductMutation,
  useEditCategoriesMutation,
  useAddCategoryMutation,
} = productsApiSlice;
