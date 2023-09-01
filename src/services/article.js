import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiKey = import.meta.env.VITE_API_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://olcaydevlibrary.azurewebsites.net/api/app/',
        prepareHeaders: (headers) => {
            headers.set('X-API-Key', apiKey);

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            // encodeURIComponent() function encodes special characters that may be present in the parameter values
            // If we do not properly encode these characters, they can be misinterpreted by the server and cause errors or unexpected behavior. Thus that RTK bug
            query: (params) => `custom/analyze?url=${encodeURIComponent(params.articleUrl)}`,
        }),
    }),
})

export const { useLazyGetSummaryQuery } = articleApi