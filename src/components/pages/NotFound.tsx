import React from 'react'
import NavBar from '../organisms/NavBar'
import { Box, Container, Typography } from '@mui/material'

export default function NotFound() {
    return (
        <>
            <NavBar></NavBar>
            <Container>
                <Typography align='center' variant='h1' style={{ marginTop: "40vh" }}>404 - Not Found</Typography>
            </Container>
        </>
    )
}
