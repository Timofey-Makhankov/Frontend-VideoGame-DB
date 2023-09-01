import NavBar from '../organisms/NavBar'
import { Container } from '@mui/material'
import UserInputForm from '../organisms/UserInputForm'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import AuthorisationService from '../../service/AuthorisationService'
import { ACCESS_TOKEN, LOGGED_IN_USER } from '../../constants'
import { AxiosResponse } from 'axios'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContextId'
import { UserInputFormType } from '../../types/UserInputForm'

export default function RegisterPage() {
    const navigate = useNavigate()
    const { setId } = useContext(UserContext)
    const login = (email: string, password: string) => {
        console.log("Registration User")
        AuthorisationService().register(email, password)
            .then(() => {
                console.log("Authenticating new User")
                AuthorisationService().loginUser(email, password)
                .then((value: AxiosResponse) => {
                    setId(value.data.id)
                    localStorage.setItem(LOGGED_IN_USER, JSON.stringify(value.data))
                    console.log("User, ", value.data)
                    localStorage.setItem(ACCESS_TOKEN, value.headers.authorization.substring(7))
                    navigate("/")
                })
                .catch((error: string) => {
                    console.log(error)
                })
            })
            .catch((error: string) => {
                console.log(error)
            })
    }

    const prop: UserInputFormType = {
        title: "Register",
        link: "/login",
        linkTitle: "Login",
        linkDescription: "Do you already have an Account? "
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: (values) => {
            const errors: { email?: string, password?: string } = {}
            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }
            if (!values.password) {
                errors.password = "Required"
            }
            return errors
        },
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                login(values.email, values.password)
                setSubmitting(false)
            }, 400);
        }
    })
    return (
        <>
            <NavBar></NavBar>
            <Container>
                <UserInputForm formikConfig={formik} props={prop}></UserInputForm>
            </Container>
        </>
    )
}
