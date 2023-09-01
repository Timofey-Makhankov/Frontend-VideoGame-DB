import { SyntheticEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGGED_IN_USER } from '../../constants'
import { ROUTE } from '../../types/RouteLinks'
import NavBar from '../organisms/NavBar'
import { Container } from '@mui/system'
import { Button, IconButton, List, ListItem, ListItemText, MenuItem, Snackbar, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { User } from '../../types/User'
import { getAverageRating, toCapitalCase } from '../../util'
import AuthorisationService from '../../service/AuthorisationService'
import { Role } from '../../types/Role'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { VideoGame } from '../../types/VideoGame'
import VideoGameService from '../../service/VideoGameService'

export default function Dashboard() {
  const navigate = useNavigate()
  const [state, setState] = useState({ open: false, text: "" })
  const [userData, setUserData] = useState<User | undefined>(undefined)
  const [roles, setRoles] = useState<Role[]>([])
  const [selectedRole, setSelectedRole] = useState<string | undefined>(undefined)
  const [videoGameList, setVideoGameList] = useState<VideoGame[]>()
  //const [videoGameList, setVideoGameList] = useState<Ratin[]>()

  useEffect(() => {
    if (!localStorage.getItem(LOGGED_IN_USER)) {
      navigate(ROUTE.Login)
    } else {
      setUserData(JSON.parse(localStorage.getItem(LOGGED_IN_USER)!))
    }
    AuthorisationService().getAllAvailableRoles()
      .then((list: Role[]) => { setRoles(list) })
      .catch((error) => { console.log(error) })
    VideoGameService().getAllVideoGames()
      .then((data) => { setVideoGameList(data) })
    return () => { }
  }, [])

  const handleClick = () => {
    console.log("Clicked button")
    if (userData && selectedRole !== undefined) {
      console.log("inside the check")
      const role = roles.find((role) => (role.role === selectedRole))
      userData.roles.push(role!)
      console.log(userData)
      AuthorisationService().updateUser(userData.id!, userData)
        .then((data) => {
          console.log("response data: ", data.data)
          localStorage.setItem(LOGGED_IN_USER, JSON.stringify(data.data))
          setUserData({ id: data.data.id, email: data.data.email, roles: data.data.roles })
        })
        .catch(error => console.log(error))
    }
  }

  const handleChange = (event: any) => {
    setSelectedRole(event.target.value)
  }

  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setState({ open: false, text: "" })
  }

  const videoGamesColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 325 },
    { field: 'title', headerName: 'Video Game Title', width: 250 },
    { field: 'release_date', headerName: 'Release Date', width: 120 },
    { field: 'rating', headerName: 'Rating Value', width: 120 }
  ]

  const videoGamesrows = videoGameList?.map((video) => ({
      id: video.id,
      title: video.title,
      release_date: video.release_date,
      rating: getAverageRating(video.rating_values)
    })
  )

  return (
    <>
      <NavBar />
      <Container>
        <Typography fontSize={36} fontWeight={700}>Dashboard</Typography>
        <Typography>User Information:</Typography>
        <Typography>Email: {userData?.email}</Typography>
        <Typography>Roles:</Typography>
        <List>
          {userData && userData.roles.map((value: Role, index) => (
            <ListItem key={index}>
              <ListItemText primary={toCapitalCase(value.role)} />
            </ListItem>
          ))}
        </List>
        <TextField
          id='outlined-select-role'
          select
          label="Select"
          helperText="Please select new Role"
          onChange={handleChange}
        >
          {roles && roles.map((role, index) => {
            console.log(role);
            return (<MenuItem key={index} value={role.role}>
              {toCapitalCase(role.role)}
            </MenuItem>)
          })}
        </TextField>
        <Button variant='outlined' onClick={handleClick}>Add Role</Button>
        {videoGameList && (<DataGrid
          sx={{ mt: 4 }}
          rows={videoGamesrows!}
          columns={videoGamesColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10]}
        />)}
      </Container>
      <Snackbar
        open={state.open}
        autoHideDuration={4000}
        onClose={handleClose}
        action={<IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>}
        message={state.text}
        anchorOrigin={{ 'vertical': 'top', 'horizontal': 'right' }}
      />
    </>
  )
}
