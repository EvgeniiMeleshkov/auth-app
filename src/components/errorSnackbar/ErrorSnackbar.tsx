import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {setErrorAC} from '../../reducers/appReducer';

// type ErrorSnackbarPropsType = {
// }

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    // const [err, setErr] = useState(error)
    const error = useSelector<AppRootStateType, string>(state => state.app.error)
    const dispatch = useDispatch()
    const isOpen = error !== ''

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(''))
    };


    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={isOpen} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
