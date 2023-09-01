import { Container } from '@mui/material'
import NavBar from '../organisms/NavBar'
import EditVideoGameForm from '../organisms/EditVideoGameForm'
import { useFormik } from 'formik'
import dayjs, { Dayjs } from 'dayjs'
import { useNavigate, useParams } from 'react-router-dom'
import { VideoGameRequest } from '../../types/VideoGameRequest'
import VideoGameService from '../../service/VideoGameService'
import { ROUTE } from '../../types/RouteLinks'
import { VideoGame } from '../../types/VideoGame'
import { useEffect } from 'react'

export default function EditVideoGame() {
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        id && VideoGameService().getVideoGameById(id)
            .then((value: VideoGame) => {
                formik.setValues({ title: value.title, description: value.description, releaseDate: dayjs(value.release_date) })
            })
            .catch((error) => { console.log(error) })
        return () => { }
    }, [])


    const handleSubmit = (title: string, description: string, releaseDate: Dayjs) => {
        const game: VideoGameRequest = {
            name: title,
            description: description,
            releaseDate: releaseDate.format("YYYY-MM-DD")
        }
        console.log("inside handle submit")
        if (id !== undefined) {
            VideoGameService().updateVideoGame(id, game)
                .then((_value) => {
                    navigate(ROUTE.Home)
                })
                .catch((error) => { console.log(error) })
        } else {
            console.log("id is undefined")
        }
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
                handleSubmit(values.title, values.description, values.releaseDate)
                setSubmitting(false)
            }, 400);
        }
    })
    return (
        <>
            <NavBar />
            <Container>
                <EditVideoGameForm formikConfig={formik} />
            </Container>
        </>
    )
}
