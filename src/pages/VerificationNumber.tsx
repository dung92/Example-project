import { FormikHelpers, Formik, Form, Field, FieldProps } from 'formik';
import * as yup from 'yup';
import Firebase from 'firebase/app';
import { Box, MenuItem, Button, TextField, Grid, Hidden, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import firebase from '../config/firebase';
import { ModelVerifyNumber } from '../model/ModelVerifyNumber';
import { ModelVerifiCationNumberProp } from '../model/ModelVerificationNumberProp';

const useStyles = makeStyles(() => ({
    rootSelect: {
        '& .MuiSelect-root': {
            display: 'flex'
        }
    },
    rootButton: {
        paddingTop: 0
    },
    rootVerifyButton: {
        '& .MuiButton-label': {
            padding: '0px 30px 0px 30px'
        }

    }
}));
export const VerificationNumber = (props: ModelVerifiCationNumberProp) => {
    const { setShowLogin, setValueSubmit, setfinal, setShowOTP, countryCodeArray } = props;
    const validationSchema = yup.object().shape({
        phone: yup.string()
            .required('Phone is required'),
        countryCode: yup.number()
            .required('Country is required'),
    })
    const classes = useStyles();

    const rederectToLogin = () => {
        setShowLogin(true);
    }


    return (
        <Formik
            initialValues={{
                countryCode: 65,
                phone: 0
            }}
            validationSchema={validationSchema}
            onSubmit={(
                values: ModelVerifyNumber,
                { setSubmitting }: FormikHelpers<ModelVerifyNumber>
            ) => {
                setSubmitting(false);
                const valueSubmitPhone = { ...values };
                let verify = new Firebase.auth.RecaptchaVerifier('recaptcha-container', { size: "invisible" });
                firebase.auth().signInWithPhoneNumber(`+${values.countryCode}` + valueSubmitPhone.phone, verify).then((confirmationResult) => {
                    console.log(confirmationResult, 'confirmationResult')
                    setfinal(confirmationResult);
                    setValueSubmit({
                        phone: values.phone,
                        countryCode: values.countryCode
                    })
                    setShowOTP(true)
                }).catch((error: {}) => {
                    console.log("SMS not sent")
                });

            }}
        >
            {({ errors, touched, submitForm }) => (
                <Form>
                    <Box margin={'20px 0px 20px 0px '}>
                        <Grid container>
                            <Grid item md={4}>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Field
                                    name='countryCode'
                                >
                                    {({
                                        field
                                    }: FieldProps<ModelVerifyNumber>) => (
                                        <TextField
                                            id="standard-select-currency"
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            name={field.name}
                                            variant="outlined"
                                            error={!!errors.countryCode && touched.phone}
                                            helperText={!!errors.countryCode && touched.countryCode ? errors.countryCode : ''}
                                            label="Country"
                                            select
                                            fullWidth
                                            className={classes.rootSelect}
                                        >
                                            {countryCodeArray.map((item, key) =>

                                                <MenuItem key={key} value={item.dial_code}>{`+${item.dial_code}`}</MenuItem>

                                            )}

                                        </TextField>

                                    )}
                                </Field>
                            </Grid>
                            <Grid item md={4}>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box margin={'20px 0px 20px 0px '}>
                        <Grid container>
                            <Grid item md={4}>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Field
                                    name='phone'
                                >
                                    {({
                                        field
                                    }: FieldProps<ModelVerifyNumber>) => (
                                        <TextField
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            name={field.name}
                                            variant="outlined"
                                            label="Phone Number"
                                            error={!!errors.phone && touched.phone}
                                            helperText={!!errors.phone && touched.phone ? errors.phone : ''}
                                            fullWidth
                                        />
                                    )}
                                </Field>
                            </Grid>
                            <Grid item md={4}>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Hidden only="xs">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={submitForm}
                                className={classes.rootVerifyButton}
                            >
                                Verify Number
                            </Button>
                        </Hidden>

                        <Hidden only="lg" smUp>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={submitForm}
                                fullWidth
                                className={classes.rootVerifyButton}
                            >
                                Verify Number
                            </Button>
                        </Hidden>

                    </Box>

                    <Box marginTop="20px">
                        <Grid container>
                            <Grid item md={4}>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Grid container>
                                    <Grid item xs={9} md={8}>
                                        <b>
                                            ALREADY HAVE AN ACCOUNT?
                                        </b>
                                    </Grid>
                                    <Hidden only="lg" smUp>
                                        <Grid item xs={1}>
                                        </Grid>
                                    </Hidden>

                                    <Grid item xs={2} md={4}>
                                        <Button onClick={rederectToLogin} color="primary" className={classes.rootButton}>
                                            LOG IN
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4}>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid container>
                        <Grid item md={4}>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box marginTop="20px">
                                <div id="recaptcha-container" />
                            </Box>
                        </Grid>
                        <Grid item md={4}>
                        </Grid>
                    </Grid>

                </Form>
            )}
        </Formik>
    )
}

VerificationNumber.propTypes = {
    setShowLogin: PropTypes.func,
    setValueSubmit: PropTypes.func,
    setfinal: PropTypes.func,
    setShowOTP: PropTypes.func,
    countryCodeArray: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.string,
        dial_code: PropTypes.string
    }))
}