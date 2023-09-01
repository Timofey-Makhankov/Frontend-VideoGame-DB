import { Card, CardContent, Box, CardActionArea, CardActions, IconButton, Rating, Button } from "@mui/material"
import { VideoGame } from '../../types/VideoGame'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VideoGameService from "../../service/VideoGameService";
import { useContext, useState } from "react";
import { DialogVideoGameContext } from "../../context/VideoGameCardDialogContext";
import { getAverageRating } from "../../util";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../types/RouteLinks";
import ReviewDialog from "../organisms/ReviewDialog";

export default function VideoGameCard({ prop }: { prop: VideoGame }) {
  console.log(prop)
  const navigate = useNavigate()
  const { setOpen, setVideoGame } = useContext(DialogVideoGameContext)
  const [ open, openReview ] = useState<boolean>(false)

  const handleDelete = (id: string) => {
    VideoGameService().deleteVideoGame(id)
      .then(() => { console.log("Deleted Successfully"); window.location.reload() })
      .catch((error) => { console.log("wasn't able to delete Game", error) })
  }

  return (
    <>
      <Card style={{ height: "100%" }}>
        <CardActionArea onClick={() => { setVideoGame(prop); setOpen(true) }}>
          <CardContent>
            <Box sx={{ minHeight: "5rem", fontSize: "h4.fontSize" }}>
              {prop.title}
            </Box>
            <p>{prop.description ? prop.description : "No Description"}</p>
            <p>release date: {prop.release_date ? prop.release_date : "No Release Date"}</p>
            <Rating name="read-only" value={getAverageRating(prop.rating_values)} precision={0.1} readOnly />
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton onClick={() => { navigate(ROUTE.EditGame.replace(":id", prop.id)) }}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => { handleDelete(prop.id) }}>
            <DeleteIcon />
          </IconButton>
          <Button sx={{ ml: 'auto' }} onClick={() => { openReview(true) }}>Leave a Review</Button>
        </CardActions>
      </Card>
      <ReviewDialog open={open} openCallback={openReview} gameId={prop.id}/>
    </>
  )
}
