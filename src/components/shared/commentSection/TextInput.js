import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';

const TextInput = ({label, placeholder,value,onChange,onBlur,errorMessage,type, ...other}) => {



    return (
        <Grid container>
            <Grid item xs={2} md={1} display='flex' alignItems='center'>
                <Typography variant='body1' component='label' pb={2}>{label}: </Typography>
            </Grid>
            <Grid item xs={10} md={11}>
                <TextField
                {...other}
                hiddenLabel
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                fullWidth variant='filled'
                placeholder={placeholder}
                size='small'
                helperText={errorMessage? <Typography textAlign='right' color='error' fontSize={13} >{errorMessage}</Typography>: ' '}   
                type={type}          
                />
            </Grid>
        </Grid>
    );
};

export default TextInput;