import React from 'react';
import { Box, Grid, OutlinedInput } from '@material-ui/core';
import PropTypes from 'prop-types';

export const VerificationCode = (props: {
    valueFirstOTP: string,
    valueSecondOTP: string,
    valueThirdOTP: string,
    valueFourOTP: string,
    valueFiveOTP: string,
    valueSixOTP: string,

    changeInputFirst: (e: React.ChangeEvent<HTMLInputElement>) => void,
    changeInputSecond: (e: React.ChangeEvent<HTMLInputElement>) => void,
    changeInputThird: (e: React.ChangeEvent<HTMLInputElement>) => void,
    changeInputFour: (e: React.ChangeEvent<HTMLInputElement>) => void,
    changeInputFive: (e: React.ChangeEvent<HTMLInputElement>) => void,
    changeInputSix: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errorOTP: {
        errorValidNumber: string,
        errorNullOTP: string
    }
}) => {
    return (
        <Box mt="20px">
            <Grid container>
                <Grid item md={4}>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container>
                        <Grid item xs={2} md={2}>
                            <Box>
                                <OutlinedInput value={props.valueFirstOTP} onChange={props.changeInputFirst} />
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Box ml="5px">
                                <OutlinedInput value={props.valueSecondOTP} onChange={props.changeInputSecond} />
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Box ml="5px">
                                <OutlinedInput value={props.valueThirdOTP} onChange={props.changeInputThird} />
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Box ml="5px">
                                <OutlinedInput value={props.valueFourOTP} onChange={props.changeInputFour} />
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Box ml="5px">
                                <OutlinedInput value={props.valueFiveOTP} onChange={props.changeInputFive} />
                            </Box>
                        </Grid>
                        <Grid item xs={2} md={2}>
                            <Box ml="5px">
                                <OutlinedInput value={props.valueSixOTP} onChange={props.changeInputSix} />
                            </Box>
                        </Grid>
                        {props.errorOTP.errorValidNumber !== '' && <Box display="flex" justifyContent="center" width="100%" marginTop="10px" alignItems="center" color="red">{props.errorOTP.errorValidNumber}</Box>}
                        {props.errorOTP.errorNullOTP !== '' && <Box display="flex" justifyContent="center" width="100%" marginTop="10px" alignItems="center" color="red">{props.errorOTP.errorNullOTP}</Box>}
                    </Grid>
                </Grid>
                <Grid item md={4}>
                </Grid>
            </Grid>

        </Box>
    )
}

VerificationCode.prototype = {
    valueFirstOTP: PropTypes.string,
    valueSecondOTP: PropTypes.string,
    valueThirdOTP: PropTypes.string,
    valueFourOTP: PropTypes.string,
    valueFiveOTP: PropTypes.string,
    valueSixOTP: PropTypes.string,
    changeInputFirst: PropTypes.func,
    changeInputSecond: PropTypes.func,
    changeInputThird: PropTypes.func,
    changeInputFour: PropTypes.func,
    changeInputFive: PropTypes.func,
    changeInputSix: PropTypes.func,
}