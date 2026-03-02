import { baseApi } from "../../base/baseAPI";

const carsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCars: builder.query({
            query: () => ({
                url: `/cars${location?.search}`,
            }),
        }),

        getCarById: builder.query({
            query: (id) => `/cars/${id}`,
            transformResponse: (res: { data: any }) => res?.data,
        }),

        createCar: builder.mutation({
            query: (body) => ({
                url: "/cars",
                method: "POST",
                body,
            }),
        }),

        updateCar: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/cars/${id}`,
                method: "PUT",
                body,
            }),
        }),

        deleteCar: builder.mutation({
            query: (id) => ({
                url: `/cars/${id}`,
                method: "DELETE",
            }),
        }),

        getCarAnalytics: builder.query({
            query: (id) => `/cars/${id}/analytics`,
            transformResponse: (res: { data: any }) => res?.data,
        }),

        getCarGrowth: builder.query({
            query: () => `/analytics/admin-car-growth-chart${location?.search}`,
            transformResponse: (res: { data: any }) => res?.data,
        }),
    }),
});

export const {
    useGetCarsQuery,
    useGetCarByIdQuery,
    useCreateCarMutation,
    useUpdateCarMutation,
    useDeleteCarMutation,
    useGetCarAnalyticsQuery,
    useGetCarGrowthQuery,
} = carsApi;
