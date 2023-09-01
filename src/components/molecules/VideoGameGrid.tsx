import { Grid } from '@mui/material'
import { VideoGame } from '../../types/VideoGame'
import VideoGameCard from './VideoGameCard'

export default function VideoGameGrid({ list }: { list: VideoGame[] }) {
    return (
        <Grid container alignItems="stretch" spacing={3} sx={{ mt: 2 }}>
            {list.map((videoGame: VideoGame) => {
                return (
                    <Grid item xs={4} key={videoGame.id}>
                        <VideoGameCard prop={videoGame}></VideoGameCard>
                    </Grid>
                )
            })}
        </Grid>
    )
}
