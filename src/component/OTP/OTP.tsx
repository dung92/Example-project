import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Typography, Button, TextField, InputAdornment, Grid, Hidden, Link, OutlinedInput } from '@material-ui/core';
import { FormikHelpers, Formik, Form, Field, FieldProps } from 'formik';
import * as yup from 'yup';
import { ModelOTP } from './model';
import firebase from '../../config/firebase';
import Firebase from 'firebase/app';

const validationSchema = yup.object().shape({
  phone: yup.string()
    .required('Phone is required'),
  country: yup.string()
    .required('Country is required'),
})



const OTP = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [valueFirstInput, setValueFirstInput] = useState('');
  const [valueSecondInput, setValueSecondInput] = useState('');
  const [valueThirdInput, setValueThirdInput] = useState('');
  const [valueFourInput, setValueFourInput] = useState('');
  const [valueFiveInput, setValueFiveInput] = useState('');
  const [valueSixInput, setValueSixInput] = useState('');
  const [valueSubmit, setValueSubmit] = useState<ModelOTP>({
    phone: '',
    country: ''
  });

  const [final, setfinal] = useState({});

  const [errorOTP, setErrorOTP] = useState({
    errorValidNumber: '',
    errorNullOTP: ''
  })

  useEffect(() => {
    setErrorOTP({
      errorValidNumber: '',
      errorNullOTP: ''
    })
  }, [showOTP])


  useEffect(() => {
    // Update the document title using the browser API
    const numbers = /^[0-9]+$/;

    if (valueFirstInput === '' || valueSecondInput === '' || valueThirdInput === '' || valueFourInput === '' || valueFiveInput === '' || valueSixInput === '') {
      if (valueFirstInput !== '' || valueSecondInput !== '' || valueThirdInput !== '' || valueFourInput !== '' || valueFiveInput !== '' || valueSixInput !== '') {
        if (!valueFirstInput.match(numbers) || !valueSecondInput.match(numbers) || !valueThirdInput.match(numbers) || !valueFourInput.match(numbers) || !valueFiveInput.match(numbers) || !valueSixInput.match(numbers)) {
          setErrorOTP({ errorValidNumber: 'Invaid OTP', errorNullOTP: 'Please fill all input' })
        } else {
          setErrorOTP({ errorValidNumber: '', errorNullOTP: '' })
        }
      } else {
        setErrorOTP({ errorValidNumber: '', errorNullOTP: 'Please fill all input' })
      }
    } else {
      if (valueFirstInput !== '' && valueSecondInput !== '' && valueThirdInput !== '' && valueFourInput !== '' && valueFiveInput !== '' && valueSixInput !== '') {
        const valueInputOtp = `${valueFirstInput}${valueSecondInput}${valueThirdInput}${valueFourInput}${valueFiveInput}${valueSixInput}`;
      
         
          Object.getPrototypeOf(final).confirm(valueInputOtp).then((result: any) => {
            // success
            console.log('ok-done')
          }).catch((err: any) => {
            alert("Wrong code");
          })
        
      }
      if (valueFirstInput !== '' || valueSecondInput !== '' || valueThirdInput !== '' || valueFourInput !== '' || valueFiveInput !== '' || valueSixInput !== '') {
        if (!valueFirstInput.match(numbers) || !valueSecondInput.match(numbers) || !valueThirdInput.match(numbers) || !valueFourInput.match(numbers) || !valueFiveInput.match(numbers) || !valueSixInput.match(numbers)) {
          setErrorOTP({ errorValidNumber: 'Invaid OTP', errorNullOTP: '' })
        } else {
          setErrorOTP({ errorValidNumber: '', errorNullOTP: '' })
        }
      } else {
        setErrorOTP({ errorValidNumber: '', errorNullOTP: 'Please fill all input' })
      }
    }


  }, [valueFirstInput, valueSecondInput, valueThirdInput, valueFourInput, valueFiveInput, valueSixInput]);

  const changeInputFirst = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueFirstInput(event.target.value)
  }

  const changeInputSecond = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSecondInput(event.target.value)
  }

  const changeInputThird = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueThirdInput(event.target.value)
  }

  const changeInputFour = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueFourInput(event.target.value)
  }

  const changeInputFive = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueFiveInput(event.target.value)
  }

  const changeInputSix = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSixInput(event.target.value)
  }


  return (
    <Box>
      <Box textAlign="left" padding="20px" marginTop="20px">
        <Typography variant="h4" component="h4" >DayOne</Typography>
      </Box>
      <Box padding={"20px"}>
        <Box>
          {!showOTP ? <Typography variant="h4" component="h4" >Let's get started!</Typography> : <Typography variant="h4" component="h4" >Please enter <br /> verification code.</Typography>}
        </Box>
        <Box>
          {!showOTP ? <Formik
            initialValues={{
              country: '',
              phone: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(
              values: ModelOTP,
              { setSubmitting }: FormikHelpers<ModelOTP>
            ) => {
              setValueSubmit({
                country:'',
                phone: values.phone
              })
              let verify = new Firebase.auth.RecaptchaVerifier('recaptcha-container');
              firebase.auth().signInWithPhoneNumber(values.phone, verify).then((confirmationResult) => {
                console.log(Object.getPrototypeOf(confirmationResult).confirm(), 'confirmationResult')
                console.log("OTP has been sent")
                setfinal(confirmationResult);
                setSubmitting(false);
                setShowOTP(true)
              }).catch((error) => {
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
                        name='country'
                      >
                        {({
                          field
                        }: FieldProps<ModelOTP>) => (
                          <TextField
                            value={field.value || ''}
                            onChange={field.onChange}
                            name={field.name}
                            variant="outlined"
                            error={!!errors.country && touched.phone}
                            helperText={!!errors.country && touched.country ? errors.country : ''}
                            label="Country"
                            select
                            fullWidth
                            InputProps={{
                              startAdornment: <InputAdornment position="start">+65</InputAdornment>,
                            }}

                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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
                        }: FieldProps<ModelOTP>) => (
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
                    >
                      Verify Number
                    </Button>
                  </Hidden>
                  <div id="recaptcha-container" />
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
                          <Link href="#" underline="none">
                            LOG IN
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item md={4}>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik> :
            <Box mt="20px">
              <Grid container>
                <Grid item md={4}>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Grid container>
                    <Grid item xs={2} md={2}>
                      <Box>
                        <OutlinedInput value={valueFirstInput} onChange={changeInputFirst} />
                      </Box>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <Box ml="5px">
                        <OutlinedInput value={valueSecondInput} onChange={changeInputSecond} />
                      </Box>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <Box ml="5px">
                        <OutlinedInput value={valueThirdInput} onChange={changeInputThird} />
                      </Box>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <Box ml="5px">
                        <OutlinedInput value={valueFourInput} onChange={changeInputFour} />
                      </Box>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <Box ml="5px">
                        <OutlinedInput value={valueFiveInput} onChange={changeInputFive} />
                      </Box>
                    </Grid>
                    <Grid item xs={2} md={2}>
                      <Box ml="5px">
                        <OutlinedInput value={valueSixInput} onChange={changeInputSix} />
                      </Box>
                    </Grid>
                    {errorOTP.errorValidNumber !== '' && <Box display="flex" justifyContent="center" width="100%" marginTop="10px" alignItems="center" color="red">{errorOTP.errorValidNumber}</Box>}
                    {errorOTP.errorNullOTP !== '' && <Box display="flex" justifyContent="center" width="100%" marginTop="10px" alignItems="center" color="red">{errorOTP.errorNullOTP}</Box>}
                  </Grid>
                </Grid>
                <Grid item md={4}>
                </Grid>
              </Grid>

            </Box>
          }

        </Box>
        <Box>
          {showOTP && <p>A code has been sent to {valueSubmit.phone} via SMS</p>}
        </Box>
        <Box fontWeight="bold">
          {showOTP && <Link href="#" underline="none">
            RESEND CODE
          </Link>}
        </Box>

        <Box fontWeight="bold">
          {showOTP && <p>REGITER WITH ANOTHER NUMBER</p>}
        </Box>
      </Box>

    </Box >
  )
}

export default OTP;