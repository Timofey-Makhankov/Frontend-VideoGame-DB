import { AxiosInstance } from "axios";
import { defaultAxiosInstance } from "./Api";
import { User } from "../types/User";

const AuthorisationService = (api: AxiosInstance = defaultAxiosInstance) => ({
    register: async (email: string, password: string) => {
        const input = {
            email: email,
            password: password
        }
        const data = await api.post("user/register", input)
        return data
    },
    loginUser: async (email: string, password: string) => {
        const input = {
            email: email,
            password: password
        }
        const data = await api.post("user/login", input)
        return data
    },
    updateUser: async (id: string, user: User) => {
        const data = await api.put(`user/api/v1/${id}`, user)
        return data
    },
    getAllUsers: async () => {
        const data = await api.get("user/api/v1/")
        return data
    },
    getUserById: async (id: string) => {
        const data = await api.get(`user/api/v1/${id}`)
        return data
    },
    deleteUser: async (id: string) => {
        await api.delete(`user/api/v1/${id}`)
    },
    getAllAvailableRoles: async () => {
        const data = await api.get("role")
        return data.data
    }
})

export default AuthorisationService