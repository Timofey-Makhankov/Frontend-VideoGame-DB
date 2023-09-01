import { VideoGameInput } from '../../types/VideoGameInput'
import { FormikProps } from 'formik'
import { isEmpty } from '../../util'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function EditVideoGameForm({ formikConfig }: { formikConfig: FormikProps<VideoGameInput> }) {
    return (
        <form onSubmit={formikConfig.handleSubmit}>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant='h3' component="h2" align='center' style={{ marginTop: '2em' }}>Edit VideoGame</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='title'
                        name='title'
                        label="Game Title"
                        type='text'
                        inputProps={{ autoComplete: 'off' }}
                        required
                        sx={{ width: 300 }}
                        value={formikConfig.values.title}
                        onChange={formikConfig.handleChange}
                        error={isEmpty(formikConfig.errors.title)}
                        helperText={isEmpty(formikConfig.errors.title) ? formikConfig.errors.title : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='description'
                        name='description'
                        label="Game Description"
                        type='text'
                        required
                        sx={{ width: 300 }}
                        inputProps={{ autoComplete: 'off' }}
                        multiline
                        minRows={4}
                        value={formikConfig.values.description}
                        onChange={formikConfig.handleChange}
                        error={isEmpty(formikConfig.errors.description)}
                        helperText={isEmpty(formikConfig.errors.description) ? formikConfig.errors.description : ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                        <DatePicker
                            label="Release Date"
                            value={formikConfig.values.releaseDate}
                            onChange={formikConfig.handleChange}
                            sx={{ width: 300 }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' type='submit'>Update Game</Button>
                </Grid>
            </Grid>
        </form>
    )
}
