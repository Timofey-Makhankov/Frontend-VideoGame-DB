import { AxiosInstance } from "axios"
import { defaultAxiosInstance } from "./Api"
import { VideoGameRequest } from "../types/VideoGameRequest"

const VideoGameService = (api: AxiosInstance = defaultAxiosInstance) => ({
    getAllVideoGames: async () => {
        const response = await api.get("api/v1/videogames")
        return response.data
    },
    getVideoGameById: async (id: string) => {
        const response = await api.get(`api/v1/videogames/${id}`)
        return response.data
    },
    createVideoGame: async (videoGame: VideoGameRequest) => {
        const response = await api.post("api/v1/videogames", videoGame)
        return response
    },
    updateVideoGame: async (id: String, videoGame: VideoGameRequest) => {
        const response = await api.put(`api/v1/videogames/${id}`, videoGame)
        return response
    },
    deleteVideoGame: async (id: String) => {
        const response = await api.delete(`api/v1/videogames/${id}`)
        return response
    }
})

export default VideoGameService