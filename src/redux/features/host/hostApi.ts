import { baseApi } from "../../base/baseAPI";

const hostApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHosts: builder.query({
            query: () => ({
                url: `/users/hosts${location?.search}`,
            }),
            transformResponse: (res: { data: any }) => res?.data,
        }),

        getHostById: builder.query({
            query: (id) => `/hosts/${id}`,
            transformResponse: (res: { data: any }) => res?.data,
        }),

        createHost: builder.mutation({
            query: (body) => ({
                url: "/hosts",
                method: "POST",
                body,
            }),
        }),

        updateHost: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/hosts/${id}`,
                method: "PUT",
                body,
            }),
        }),

        deleteHost: builder.mutation({
            query: (id) => ({
                url: `/hosts/${id}`,
                method: "DELETE",
            }),
        }),

        getHostAnalytics: builder.query({
            query: (id) => `/hosts/${id}/analytics`,
            transformResponse: (res: { data: any }) => res?.data,
        }),

        getHostGrowth: builder.query({
            query: () => `/analytics/admin-host-growth-chart${location?.search}`,
            transformResponse: (res: { data: any }) => res?.data,
        }),
    }),
});

export const {
    useGetHostsQuery,
    useGetHostByIdQuery,
    useCreateHostMutation,
    useUpdateHostMutation,
    useDeleteHostMutation,
    useGetHostAnalyticsQuery,
    useGetHostGrowthQuery,
} = hostApi;
