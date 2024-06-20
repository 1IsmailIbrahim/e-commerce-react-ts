import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICategory, ICategoryResponse } from "../../interfaces";
import CookieService from "../../services/CookieService";

export const categoriesApiSlice = createApi({
  reducerPath: "categoriesApi",
  tagTypes: ["Category"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<ICategoryResponse, void>({
      query: () => ({
        url: "/api/categories",
        providesTags: ["Category"],
      }),
    }),
    editCategories: builder.mutation<ICategory, { id: number; body: FormData }>(
      {
        query: ({ id, body }) => ({
          url: `/api/categories/${id}`,
          method: "PUT",
          body: body,
          headers: {
            Authorization: `Bearer ${CookieService.get("jwt")}`,
          },
        }),
        async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
          if (id === undefined) return;
          const patchResult = dispatch(
            categoriesApiSlice.util.updateQueryData(
              "getCategories",
              undefined,
              (draft) => {
                const categoryIndex = draft.data.findIndex(
                  (cat) => cat.id === id
                );
                if (categoryIndex !== -1) {
                  draft.data[categoryIndex].attributes = {
                    ...draft.data[categoryIndex].attributes,
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
        invalidatesTags: ["Category"],
      }
    ),
    addCategory: builder.mutation<ICategory, { body: FormData }>({
      query: ({ body }) => ({
        url: `/api/categories/`,
        method: "POST",
        body: body,
        headers: {
          Authorization: `Bearer ${CookieService.get("jwt")}`,
        },
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useEditCategoriesMutation,
  useAddCategoryMutation,
} = categoriesApiSlice;
