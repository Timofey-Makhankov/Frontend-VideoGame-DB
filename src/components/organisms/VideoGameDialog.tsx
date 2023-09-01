import { Dialog, DialogContent, DialogTitle, IconButton, Rating, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { DialogVideoGameContext } from '../../context/VideoGameCardDialogContext';
import { getAverageRating } from '../../util';

export default function VideoGameDialog() {
    const { open, videoGame, setOpen } = useContext(DialogVideoGameContext)

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog
            open={open}
        >
            <DialogTitle fontSize={24}>
                {videoGame?.title}
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
                <Typography>{videoGame?.description}</Typography>
                <br/>
                <Typography>id: {videoGame?.id}</Typography>
                <Typography>Release Date: {videoGame?.release_date}</Typography>
                <br />
                <Rating name="read-only" value={videoGame ? getAverageRating(videoGame.rating_values) : 0} precision={0.5} readOnly/>
            </DialogContent>
        </Dialog>
    )
}
