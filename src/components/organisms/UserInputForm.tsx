import { FormikProps } from 'formik'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { isEmpty } from '../../util'
import { UserInputFormType } from '../../types/UserInputForm'

export default function UserInputForm({ props, formikConfig }: { props: UserInputFormType, formikConfig: FormikProps<{ email: string, password: string }> }) {
    return (
        <form onSubmit={formikConfig.handleSubmit}>
            <Grid container direction="column" alignItems="center" justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                    <Typography variant='h3' component="h2" align='center' style={{ marginTop: '4em' }}>{props.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='email'
                        name='email'
                        label="Email"
                        type='email'
                        value={formikConfig.values.email}
                        required
                        sx={{ width: 250 }}
                        onChange={formikConfig.handleChange}
                        error={isEmpty(formikConfig.errors.email)}
                        helperText={formikConfig.errors.email ? formikConfig.errors.email : ""} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='password'
                        name='password'
                        label="Password"
                        type='password'
                        value={formikConfig.values.password}
                        sx={{ width: 250 }}
                        required
                        onChange={formikConfig.handleChange}
                        error={isEmpty(formikConfig.errors.password)}
                        helperText={formikConfig.errors.password ? formikConfig.errors.password : ""} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' type='submit'>{props.title}</Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{props.linkDescription}<Link component={RouterLink} to={props.link}>{props.linkTitle}</Link></Typography>
                </Grid>
            </Grid>
        </form>
    )
}
