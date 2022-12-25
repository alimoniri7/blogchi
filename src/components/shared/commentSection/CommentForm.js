import { Button, Grid, Rating, Typography } from '@mui/material';
import React from 'react';
import useInputHandler from '../../../hooks/useInputHandler';
import useValidation from '../../../hooks/useValidation';
import UploadAvatar from './UploadAvatar';
import TextInput from './TextInput';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { POST_COMMENT, PUBLISH_COMMENT } from '../../../GraphQL/gqls';
import { useEffect } from 'react';

const CommentForm = ({postSlug}) => {

    // name input
    const [name, nameHandler]= useInputHandler()
    const [nameStatus, nameValidator] = useValidation(name)

    // email input
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailMessage = 'لطفا یک ایمیل معتبر وارد کنید'
    const [email, emailHandler] = useInputHandler()
    const [emailStatus, emailValidator] = useValidation(email, emailRegex, emailMessage )

    // rate input
    const [rate, rateHandler] = useInputHandler(0)
    const [rateStatus, rateValidator] = useValidation(rate)

    // comment phrase
    const [comment, commentHandler] = useInputHandler()
    const [commentStatus , commentValdator] = useValidation(comment)

    // avatar
    const [avatarId, setAvatarId] = useState('')

    // Form Mutation 
    const [mutateForm, formResponse] = useMutation(POST_COMMENT, {
        variables: {
            fullName: name,
            email: email,
            rate: Number(rate),
            description: comment,
            avatar: avatarId ? {connect: {id: String(avatarId)}} : null,
            postSlug: postSlug

        }
    })
    console.log(formResponse);

    const [publishComment, response] = useMutation(PUBLISH_COMMENT, {
        variables: {id: formResponse.data && formResponse.data.createComment.id}
    })
    //  const postComment = async()=>{
    //     await mutateForm()
    //     console.log('done');
    //  }
    console.log(response);

    useEffect(()=>{
        if(formResponse.data) publishComment()
    }, [formResponse.data])

    
    return (
        <Grid container spacing={{xs: 0 , md : 4}} >

            <Grid item xs={12} md={6}>
                <TextInput
                 value={name}
                 type='text'
                 label='نام*'
                 placeholder='نام کامل خود را وارد کنید'
                 onChange={nameHandler}
                 onKeyUp={nameValidator}
                 onBlur={nameValidator}
                 error={nameStatus.valid? false : true}
                 color={nameStatus.valid? 'success' : 'warning'}
                 required
                 errorMessage={nameStatus.message}
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextInput
                 value={email}
                 type={email}
                 label='ایمیل*'
                 placeholder='Enter your Email address'
                 onChange={emailHandler}
                 onKeyUp={emailValidator}
                 onBlur={emailValidator}
                 error={emailStatus.valid? false : true}
                 color={emailStatus.valid? 'success' : 'warning'}
                 required
                 errorMessage={emailStatus.message}
                 dir='ltr'
                />
            </Grid>

            <Grid item xs={12} sm={6} mb={2} display='flex' justifyContent={{xs:'center', sm:'flex-start'}} >
                <UploadAvatar setAvatarId={setAvatarId} />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Grid container>
                    <Grid item xs={12} height='2.5rem' display='flex' justifyContent={{xs:'center', sm:'flex-start'}} alignItems='center' gap={2} mt='auto'>
                        <Typography variant='body1' component='label' >امتیاز*: </Typography>
                        <Rating name="size-large" value={Number(rate)} onChange={rateHandler} size="large" />
                    </Grid>
                    <Grid item xs={12} height='1.5rem' mb='auto' visibility={rateStatus.valid? 'hidden' : 'visible'} display='flex' justifyContent={{xs:'center', sm:'flex-start'}} >
                        <Typography variant='body1' component='span' color='error' fontSize={13}>این فیلد الزامی است  </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <TextInput 
                  value={comment}
                  label='توضیحات*'
                  placeholder='لطفا نظر خود را با رعایت ادب و احترام به صورت کامل شرح دهید'
                  onChange={commentHandler}
                  onBlur={commentValdator}
                  onKeyUp={commentValdator}
                  error={commentStatus.valid? false : true}
                  color={commentStatus.valid? 'success' : 'warning'}
                  required
                  errorMessage={commentStatus.message}
                  multiline
                  rows={6}
                />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent='flex-end' >
                <Button variant='contained' color='NavyBlue' size='large' onClick={mutateForm} >ارسال دیدگاه</Button>
            </Grid>
        </Grid >
    );
};

export default CommentForm;