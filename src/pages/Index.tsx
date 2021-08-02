import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, makeStyles } from '@material-ui/core';
import { countryCode } from '../API/CountryCode';
import { VerificationCode } from './VerificationCode';
import { VerificationNumber } from './VerificationNumber';
import { ModelVerifyNumber } from '../model/ModelVerifyNumber';
import { PopUpResendCode } from './PopUpResendCode';
import { Login } from './Login';


const useStyles = makeStyles(() => ({
    rootButton: {
      paddingTop: 0
    },
  }));
  
  const Index = () => {
    const [showOTP, setShowOTP] = useState(false);
    const [valueFirstOTP, setValueFirstOTP] = useState('');
    const [valueSecondOTP, setValueSecondOTP] = useState('');
    const [valueThirdOTP, setValueThirdOTP] = useState('');
    const [valueFourOTP, setValueFourOTP] = useState('');
    const [valueFiveOTP, setValueFiveOTP] = useState('');
    const [valueSixOTP, setValueSixOTP] = useState('');
    const [valueSubmit, setValueSubmit] = useState<ModelVerifyNumber>({
      phone: 0,
      countryCode: 65
    });
    const [final, setfinal] = useState({});
    const [errorOTP, setErrorOTP] = useState({
      errorValidNumber: '',
      errorNullOTP: ''
    })
    const [open, setOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
  
    const classes = useStyles();
  
    useEffect(() => {
      setErrorOTP({
        errorValidNumber: '',
        errorNullOTP: ''
      })
    }, [showOTP])
  
  
    useEffect(() => {
      // Update the document title using the browser API
      const numbers = /^[0-9]+$/;
  
      if (valueFirstOTP === '' || valueSecondOTP === '' || valueThirdOTP === '' || valueFourOTP === '' || valueFiveOTP === '' || valueSixOTP === '') {
        if (valueFirstOTP !== '' || valueSecondOTP !== '' || valueThirdOTP !== '' || valueFourOTP !== '' || valueFiveOTP !== '' || valueSixOTP !== '') {
          if (!valueFirstOTP.match(numbers) || !valueSecondOTP.match(numbers) || !valueThirdOTP.match(numbers) || !valueFourOTP.match(numbers) || !valueFiveOTP.match(numbers) || !valueSixOTP.match(numbers)) {
            setErrorOTP({ errorValidNumber: 'Invaid OTP', errorNullOTP: 'Please fill all input' })
          } else {
            setErrorOTP({ errorValidNumber: '', errorNullOTP: '' })
          }
        } else {
          setErrorOTP({ errorValidNumber: '', errorNullOTP: 'Please fill all input' })
        }
      } else {
        if (valueFirstOTP !== '' && valueSecondOTP !== '' && valueThirdOTP !== '' && valueFourOTP !== '' && valueFiveOTP !== '' && valueSixOTP !== '') {
          const valueInputOtp = `${valueFirstOTP}${valueSecondOTP}${valueThirdOTP}${valueFourOTP}${valueFiveOTP}${valueSixOTP}`;
          Object.getPrototypeOf(final).confirm(valueInputOtp).then((result: any) => {
            // success
            console.log('ok-done')
          }).catch((err: {}) => {
            alert("Wrong code");
          })
  
        }
        if (valueFirstOTP !== '' || valueSecondOTP !== '' || valueThirdOTP !== '' || valueFourOTP !== '' || valueFiveOTP !== '' || valueSixOTP !== '') {
          if (!valueFirstOTP.match(numbers) || !valueSecondOTP.match(numbers) || !valueThirdOTP.match(numbers) || !valueFourOTP.match(numbers) || !valueFiveOTP.match(numbers) || !valueSixOTP.match(numbers)) {
            setErrorOTP({ errorValidNumber: 'Invaid OTP', errorNullOTP: '' })
          } else {
            setErrorOTP({ errorValidNumber: '', errorNullOTP: '' })
          }
        } else {
          setErrorOTP({ errorValidNumber: '', errorNullOTP: 'Please fill all input' })
        }
      }
  
  
    }, [valueFirstOTP, valueSecondOTP, valueThirdOTP, valueFourOTP, valueFiveOTP, valueSixOTP]);
  
    const changeInputFirst = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueFirstOTP(event.target.value)
    }
  
    const changeInputSecond = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueSecondOTP(event.target.value)
    }
  
    const changeInputThird = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueThirdOTP(event.target.value)
    }
  
    const changeInputFour = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueFourOTP(event.target.value)
    }
  
    const changeInputFive = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueFiveOTP(event.target.value)
    }
  
    const changeInputSix = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueSixOTP(event.target.value)
    }
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const registerAnotherPhone = () => {
      setShowOTP(false);
    }
  
    return (
      <Box>
        <Box textAlign="left" padding="20px" marginTop="20px">
          <Typography variant="h4" component="h4" >DayOne</Typography>
        </Box>
        <Box padding={"20px"}>
          <Box>
            {showLogin ? <Typography variant="h4" component="h4" >Login </Typography> : !showOTP ? <Typography variant="h4" component="h4" >Let's get started!</Typography> : <Typography variant="h4" component="h4" >Please enter <br /> verification code.</Typography>}
          </Box>
          <Box>
            {showLogin ? <Login countryCodeArray={countryCode} /> : !showOTP ? <VerificationNumber setShowLogin={setShowLogin} setValueSubmit={setValueSubmit} setfinal={setfinal} setShowOTP={setShowOTP} countryCodeArray={countryCode} /> :
              <VerificationCode valueFirstOTP={valueFirstOTP} valueSecondOTP={valueSecondOTP} valueThirdOTP={valueThirdOTP} valueFourOTP={valueFourOTP} valueFiveOTP={valueFiveOTP} valueSixOTP={valueSixOTP} changeInputFirst={changeInputFirst} changeInputSecond={changeInputSecond} changeInputThird={changeInputThird} changeInputFour={changeInputFour} changeInputFive={changeInputFive} changeInputSix={changeInputSix} errorOTP={errorOTP} />
            }
  
          </Box>
          <Box>
            {showOTP && <p>A code has been sent to {valueSubmit.phone} via SMS</p>}
          </Box>
          <Box fontWeight="bold">
            {showOTP &&
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                className={classes.rootButton}
              >
                RESEND CODE
              </Button>
            }
          </Box>
  
          <Box fontWeight="bold">
            {showOTP && <p onClick={registerAnotherPhone}>REGITER WITH ANOTHER NUMBER</p>}
          </Box>
        </Box>
        {open && <PopUpResendCode open={open} handleClose={handleClose} phone={valueSubmit.phone} />}
      </Box >
    )
  }
  
  export default Index;