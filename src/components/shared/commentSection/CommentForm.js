import { Grid } from '@mui/material';
import React from 'react';
import useInputHandler from '../../../hooks/useInputHandler';
import useValidation from '../../../hooks/useValidation';
import UploadAvatar from './UploadAvatar';
import TextInput from './TextInput';

const CommentForm = () => {

    // name input
    const [name, nameHandler]= useInputHandler()
    const [nameStatus, nameValidate] = useValidation(name)
    console.log(nameStatus);

    // email input
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailMessage = 'لطفا یک ایمیل معتبر وارد کنید'
    const [email, emailHandler] = useInputHandler()
    const [emailStatus, emailValidate] = useValidation(email, emailRegex, emailMessage )
    
    return (
        <Grid container spacing={{xs: 0 , md : 4}} >
            <Grid item xs={12} md={6}>
                <TextInput
                 value={name}
                 type='text'
                 label='نام'
                 placeholder='نام کامل خود را وارد کنید'
                 onChange={nameHandler}
                 onKeyUp={nameValidate}
                 onBlur={nameValidate}
                 error={nameStatus.valid? false : true} color={nameStatus.valid? 'success' : 'warning'}
                 required
                 errorMessage={nameStatus.message}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextInput
                 value={email}
                 type={email}
                 label='ایمیل'
                 placeholder='Enter your Email address'
                 onChange={emailHandler}
                 onKeyUp={emailValidate}
                 onBlur={emailValidate}
                 error={emailStatus.valid? false : true}
                 color={emailStatus.valid? 'success' : 'warning'}
                 required
                 errorMessage={emailStatus.message}
                 dir='ltr'
                />
            </Grid>
            <Grid item xs={12}>
                <UploadAvatar/>
            </Grid>
        </Grid >
    );
};

export default CommentForm;