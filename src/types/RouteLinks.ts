export const ROUTE = {
    Home: "/",
    Login: "/login",
    Register: "/register",
    CreateGame: "/videogame/create",
    Dashboard: "/dashboard",
    EditGame: "/game/:id",
    NotFound: "*"
} as const;

type ObjectValues<T> = T[keyof T]

export type route = ObjectValues<typeof ROUTE>