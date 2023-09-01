import { AxiosInstance } from "axios";
import { defaultAxiosInstance } from "./Api";
import { RatingRequest } from "../types/RatingRequest";

const RatingsService = (api: AxiosInstance = defaultAxiosInstance) => ({
    getAllRatings: async () => {
        const response = await api.get("/api/v1/ratings")
        return response.data
    },
    getRatingById: async (id: string) => {
        const response = await api.get(`/api/v1/ratings/${id}`)
        return response.data
    },
    createRating: async (rating: RatingRequest) => {
        const response = await api.post("/api/v1/ratings", rating)
        return response.data
    },
    updateRating: async (id: string, rating: RatingRequest) => {
        const response = await api.put(`/api/v1/ratings/${id}`, rating)
        return response.data
    },
    deleteRating: async (id: string) => {
        await api.delete(`api/v1/ratings/${id}`)
    }
})

export default RatingsService