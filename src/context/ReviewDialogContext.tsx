import { createContext, useState } from "react"

export type ReviewDialogContextState = {
    open: boolean,
    openReview: (value: boolean) => void
}

const contextDefaultValues: ReviewDialogContextState = {
    open: false,
    openReview: () => {}
}

export const ReviewDialogContext = createContext<ReviewDialogContextState>(contextDefaultValues)

const ReviewDialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpenState] = useState<boolean>(false)
    const openReview = (open: boolean) => setOpenState(open)
    return (
        <ReviewDialogContext.Provider value={{ open, openReview }}>
            {children}
        </ReviewDialogContext.Provider>
    )
}

export default ReviewDialogProvider