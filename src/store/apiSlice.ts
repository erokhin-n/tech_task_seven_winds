import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRow } from '../interface'
import { ServerQuery } from '../enums'

const eID = 62652

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row` }),
    endpoints: builder => ({
        createRow: builder.mutation<IRow[], IRow>({
            query: (row) => ({
                url: ServerQuery.CREATE,
                method: 'POST',
                body: row,
            }),
        }),
        listRows: builder.query<IRow[], void>({
            query: () => ServerQuery.LIST,
        }),
        updateRow: builder.mutation<IRow[], IRow>({
            query: (row) => ({
                url: `/${row.id}/${ServerQuery.UPDATE}`,
                method: 'POST',
                body: row
            })
        }),
        deleteRow: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}/${ServerQuery.DELETE}`,
                method: 'DELETE',
            })
        }),
    })
})
  
export const { 
    useCreateRowMutation,
    useListRowsQuery,
    useUpdateRowMutation,
    useDeleteRowMutation
} = apiSlice