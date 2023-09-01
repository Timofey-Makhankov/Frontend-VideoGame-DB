import React, { createContext, useState } from "react";

export type UserContextState = {
    userId: string,
    setId: (id: string) => void
}

const contextDefaultValues: UserContextState = {
    userId: "",
    setId: () => {}
}

export const UserContext = createContext<UserContextState>(contextDefaultValues)

const UserProvider = ({children}:{children:React.ReactNode}) => {
    const [userId, setUserId] = useState<string>(contextDefaultValues.userId)
    const setId = (id: string) => setUserId(id)
    return (
        <UserContext.Provider value={{ userId, setId }}>
        {children}
        </UserContext.Provider>
    )
}

export default UserProvider