import NavBar from '../organisms/NavBar'
import { Alert, Button, Container, Grid, Snackbar, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import VideoGameService from '../../service/VideoGameService'
import { VideoGameRequest } from '../../types/VideoGameRequest'
import { ROUTE } from '../../types/RouteLinks'
import { useFormik } from 'formik'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import 'dayjs/locale/en-gb';
import { isEmpty } from '../../util'
import { SyntheticEvent, useState } from 'react'

export default function CreateGame() {
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)
    const createGame = (title: string, description: string, releaseDate: string) => {
        const game: VideoGameRequest = {
            name: title,
            description: description,
            releaseDate: releaseDate
        }
        console.log(game)
        VideoGameService().createVideoGame(game)
            .then(() => { navigate(ROUTE.Home) })
            .catch((error) => { console.log(error); setOpen(true) })
    }

    const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
    }

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            releaseDate: dayjs(new Date())
        },
        validate: (values) => {
            const errors: { title?: string, description?: string, releaseDate?: string } = {}
            if (!values.title) {
                errors.title = "Required"
            }
            if (!values.description) {
                errors.description = "Required"
            }
            if (!values.releaseDate.isValid()) {
                errors.releaseDate = "invalid Date format"
            }
            return errors
        },
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                createGame(values.title, values.description, values.releaseDate.format("YYYY-MM-DD"))
                setSubmitting(false)
            }, 400);
        }
    })

    return (
        <>
            <NavBar/>
            <Container>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container direction="column" alignItems="center" justifyContent="center" spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant='h3' component="h2" align='center' style={{ marginTop: '2em' }}>Create VideoGame</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='title'
                                name='title'
                                label="Game Title"
                                type='text'
                                inputProps={{autoComplete:'off'}}
                                required
                                sx={{ width: 300 }}
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={isEmpty(formik.errors.title)}
                                helperText={isEmpty(formik.errors.title) ? formik.errors.title : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='description'
                                name='description'
                                label="Game Description"
                                type='text'
                                required
                                inputProps={{autoComplete:'off'}}
                                multiline
                                sx={{ width: 300 }}
                                minRows={4}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                error={isEmpty(formik.errors.description)}
                                helperText={isEmpty(formik.errors.description) ? formik.errors.description : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                                <DatePicker
                                    label="Release Date"
                                    value={formik.values.releaseDate}
                                    onChange={formik.handleChange}
                                    sx={{ width: 300 }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant='contained' type='submit'>Create</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ 'vertical': 'top', 'horizontal': 'right' }}
            >
                <Alert onClose={handleClose} severity='error' >Video Game unable to be created. You may have not the Authority to create</Alert>
            </Snackbar>
        </>
    )
}
