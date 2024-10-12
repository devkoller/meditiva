import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../api/config'

export const queryApi = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: builder => ({
    getModules: builder.query({
      query: () => '/query'
    }),
    postQuery: builder.mutation({
      query: body => ({
        url: '/query',
        method: 'POST',
        body
      })
    }),
    putQuery: builder.mutation({
      query: body => ({
        url: '/query',
        method: 'PUT',
        body
      })
    }),
    deleteQuery: builder.mutation({
      query: body => ({
        url: '/query',
        method: 'DELETE',
        body
      })
    })
  })
})
