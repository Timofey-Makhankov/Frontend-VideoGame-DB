import { Role } from "./Role"

export type User = {
    id: string | undefined,
    email: string,
    roles: Role[]
}