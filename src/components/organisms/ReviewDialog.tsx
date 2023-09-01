import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Rating, Typography } from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import RatingsService from '../../service/RatingsService';
import { RatingRequest } from '../../types/RatingRequest';
import { LOGGED_IN_USER } from '../../constants';
import { User } from '../../types/User';

export default function ReviewDialog({ gameId, open, openCallback }: { gameId: string, open: boolean, openCallback: (value: boolean) => void }) {
    console.log(gameId)
    const [value, setValue] = useState<number>(0)
    //const { open, openReview } = useContext(ReviewDialogContext)
    //const [ open, openReview ] = useState<boolean>(false)
    const handleClose = () => {
        openCallback(false);
    };
    const handleChange = (event: any) => {
        setValue(event.target.value)
    }
    const handleClick = () => {
        const user: User = JSON.parse(localStorage.getItem(LOGGED_IN_USER)!)
        const data: RatingRequest = {
            userId: user.id!,
            gameId: gameId,
            value: value
        }
        console.log("Value: ", value)
        RatingsService().createRating(data)
            .then((_value) => { console.log(_value) })
            .catch((error) => { console.log(error) })
        openCallback(false)
    }
    return (
        <Dialog
            open={open}
        >
            <DialogTitle>
                Create a Review
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <Typography>How man stars do you want to rate the video game?</Typography>
                <Rating value={value} onChange={handleChange} precision={0.5}></Rating>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleClick}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}
