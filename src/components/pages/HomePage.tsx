import { useContext, useEffect, useState } from 'react'
import NavBar from '../organisms/NavBar'
import VideoGameService from '../../service/VideoGameService'
import { VideoGame } from '../../types/VideoGame'
import { Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '../../types/RouteLinks'
import { UserContext } from '../../context/UserContextId'
import VideoGameGrid from '../molecules/VideoGameGrid'
import ListReplace from '../atoms/ListReplace'
import VideoGameDialog from '../organisms/VideoGameDialog'

export default function HomePage() {
    const [videoGamelist, setVideoGameList] = useState<VideoGame[]>([])
    const navigate = useNavigate()
    //const { userId } = useContext(UserContext)

    useEffect(() => {
        const load = () => {
            VideoGameService()
                .getAllVideoGames()
                .then((data: VideoGame[]) => { setVideoGameList(data) })
                .catch(error => {
                    console.log(error)
                    navigate(ROUTE.Login)
                })
        }
        load()
        return () => { };
    }, [])

    return (
        <>
            <NavBar></NavBar>
            <Container>
                {videoGamelist.length === 0 ? <ListReplace text='No Games Found' /> : <VideoGameGrid list={videoGamelist} />}
                <Button variant='contained' onClick={() => { navigate(ROUTE.CreateGame) }} sx={{ mt: 8 }}>Create</Button>
                {/*<p>{userId}</p>
                <Typography fontSize={8}>access token: {localStorage.getItem(ACCESS_TOKEN)}</Typography>*/}
            </Container>
            <VideoGameDialog />
        </>
    )
}
