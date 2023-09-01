import { createContext, useState } from "react"
import { VideoGame } from "../types/VideoGame"

export type DialogContextState = {
    open: boolean,
    setOpen: (value: boolean) => void
    videoGame: VideoGame | undefined,
    setVideoGame: (VideoGame: VideoGame) => void
}

const contextDefaultValues: DialogContextState = {
    open: false,
    setOpen: () => {},
    videoGame: undefined,
    setVideoGame: () => {}
}

export const DialogVideoGameContext = createContext<DialogContextState>(contextDefaultValues)

const DialogVideoGameProvider = ({ children }: {children: React.ReactNode}) => {
    const [open, setOpenState] = useState<boolean>(false)
    const [videoGame, setVideoGameState] = useState<VideoGame>()
    const setOpen = (open: boolean) => setOpenState(open)
    const setVideoGame = (videoGame: VideoGame) => setVideoGameState(videoGame)
    return (
        <DialogVideoGameContext.Provider value={{ open, videoGame, setOpen, setVideoGame }}>
            {children}
        </DialogVideoGameContext.Provider>
    )
}
export default DialogVideoGameProvider