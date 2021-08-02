import { Box, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ModelResendCode } from '../model/ModelResendCode';


export const PopUpResendCode = (props: ModelResendCode) => {
    const {open, handleClose, phone} = props;
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box>
                <p>A code has been sent to {phone} via SMS</p>
            </Box>
        </Modal>
    )
}

PopUpResendCode.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.bool,
    phone: PropTypes.number
}
