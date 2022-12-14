import React, { useEffect, useState } from 'react';
import { Button, Divider, Grid, Rating, Typography } from '@mui/material';
import useInputHandler from '../../../hooks/useInputHandler';
import useValidation from '../../../hooks/useValidation';
import UploadAvatar from './UploadAvatar';
import TextInput from './TextInput';
import { useMutation } from '@apollo/client';
import { POST_COMMENT, POST_REPLY, PUBLISH_COMMENT, PUBLISH_REPLY } from '../../../GraphQL/gqls';
import SendPopUp from './SendPopUp';

const CommentForm = ({postSlug, replyForm, commentId, closeReplyPopup}) => {
    const [active, setActive] = useState({
        name: false,
        email: false,
        rate:  replyForm ? undefined : false,
        comment: false
    })
    const focusHandler = (e)=>{
        setActive(prev=>({
            ...prev,
            [e.target.name]: true
        }))
    }


    // name input
    const [name, nameHandler, setName]= useInputHandler()
    const [nameStatus, nameValidator] = useValidation(name)

    // email input
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailMessage = 'لطفا یک ایمیل معتبر وارد کنید'
    const [email, emailHandler, setEmail] = useInputHandler()
    const [emailStatus, emailValidator] = useValidation(email, emailRegex, emailMessage )

    // rate input
    const [rate, rateHandler, setRate] = useInputHandler(0)
    const [rateStatus, rateValidator] = useValidation(rate)

    // comment phrase
    const [comment, commentHandler, setComment] = useInputHandler()
    const [commentStatus , commentValdator] = useValidation(comment)

    // avatar
    const [avatarId, setAvatarId] = useState('')

    // Popup window for insure sending the form
    const [open , setOpen] = useState(false)

    const handleClickOpen = () => {
        
        if(nameStatus.valid && emailStatus.valid && commentStatus.valid){
            if(replyForm){
                setOpen(true)
            }
            if(rateStatus){
                setOpen(true)
            }else{
                rateValidator()
                setActive(prev=>({
                    name: true,
                    email: true,
                    comment: true,
                    rate: replyForm ? undefined : true
                }))
            }
            // setOpen(true);
        }else{
            nameValidator()
            emailValidator()
            commentValdator()
            rateValidator()
            setActive(prev=>({
                name: true,
                email: true,
                comment: true,
                rate: replyForm ? undefined : true
            }))
        }
    }; 
    
    useEffect(()=>{
        rateValidator()
    },[rate])

    const handleClose = () => {
        setOpen(false);
    };

    // Form Mutation 
    const [mutateForm, formResponse] = useMutation(replyForm ? POST_REPLY : POST_COMMENT, {
        variables: {
            fullName: name,
            email: email,
            rate: replyForm ? undefined : Number(rate),
            description: comment,
            avatar: avatarId ? {connect: {id: String(avatarId)}} : null,
            postSlug: replyForm ? undefined : postSlug,
            commentId: replyForm ? commentId : undefined

        }
    })

    console.log({name, email, comment, avatarId, commentId});

    let resName = ()=>{ if(formResponse.data){
        if(replyForm){
            return formResponse.data.createReply.id
        }else{
            return formResponse.data.createComment.id
        }
    }}
    const [publishComment, publishRes] = useMutation( replyForm? PUBLISH_REPLY : PUBLISH_COMMENT, {
        variables: {id: formResponse.data && resName()}
    })

    useEffect(()=>{
        if(formResponse.data) publishComment()
    }, [formResponse.data])


    // organize mutatation process
    const [mutationStatus, setMutationStatus] = useState({
        loading: false,
        error: false,
        published: false,
        called: false
    })

    useEffect(()=>{
        if(formResponse.error){
            setMutationStatus({
                error:true,
                loading: false,
                published: false,
                called: true
            })
        } else if(formResponse.data){
            setMutationStatus({
                error: false,
                loading: true,
                published: false,
                called: true
            })
        }
    }, [formResponse.data, formResponse.error])

    useEffect(()=>{
        if(publishRes.error){
            setMutationStatus({
                error:true,
                loading: false,
                published: false,
                called: true
            })
        } else if(publishRes.data){
            setMutationStatus({
                error: false,
                loading: false,
                published: true,
                called: true,
                done: true
            })
            if(replyForm) setTimeout(() => {
                closeReplyPopup()
            }, 3000); 

        }        
    }, [publishRes.data, publishRes.error])

console.log([rateStatus.valid, active.rate]);


    if(mutationStatus.done && !replyForm) return (
        <>
        <Typography textAlign='center' variant='h5' color='success.main'>دیدگاه شما با موفقیت ثبت شد!</Typography>
        <SendPopUp open={open} handleClose={handleClose} mutationStatus={mutationStatus} setMutationStatus={setMutationStatus} mutateForm={mutateForm} />

        </>
    )

    return (
        <Grid container spacing={{xs: 0 , md : 4}} >
            { !replyForm && <Grid item xs={12}>
                <Typography variant='h5' mb={1} pr={2} fontWeight={800}>ثبت دیدگاه شما</Typography>
                <Divider variant='inset'/>
            </Grid>}

            <Grid item xs={12} md={!replyForm && 6} mt={{xs: 3, md: 0}}>
                <TextInput
                 name='name'
                 value={name}
                 type='text'
                 label='نام*'
                 placeholder='نام کامل خود را وارد کنید'
                 onChange={nameHandler}
                 onFocus={focusHandler}
                 onKeyUp={nameValidator}
                 onBlur={nameValidator}
                 error={nameStatus.valid || !active.name ? false : true}
                 color={nameStatus.valid ? 'success' : 'warning'}
                 required
                 errorMessage={nameStatus.message}
                />
            </Grid>

            <Grid item xs={12} md={!replyForm && 6}>
                <TextInput
                 name='email'
                 value={email}
                 type={email}
                 label='ایمیل*'
                 placeholder='Enter your Email address'
                 onChange={emailHandler}
                 onFocus={focusHandler}
                 onKeyUp={emailValidator}
                 onBlur={emailValidator}
                 error={emailStatus.valid || !active.email ? false : true}
                 color={emailStatus.valid? 'success' : 'warning'}
                 required
                 errorMessage={emailStatus.message}
                 dir='ltr'
                />
            </Grid>

            <Grid item xs={12} sm={!replyForm && 6} mb={2} display='flex' justifyContent={{xs:'center', sm:'flex-start'}} >
                <UploadAvatar setAvatarId={setAvatarId} />
            </Grid>

            { !replyForm && <Grid item xs={12} sm={6}>
                <Grid container>
                    <Grid item xs={12} height='2.5rem' display='flex' justifyContent={{xs:'center', sm:'flex-start'}} alignItems='center' gap={2} mt='auto'>
                        <Typography variant='body1' component='label' >امتیاز*: </Typography>
                        <Rating name="rate" value={Number(rate)} onChange={rateHandler} size="large" />
                    </Grid>
                    <Grid item xs={12} height='1.5rem' mb='auto' visibility={rateStatus.valid || !active.rate ? 'hidden' : 'visible'} display='flex' justifyContent={{xs:'center', sm:'flex-start'}} >
                        <Typography variant='body1' component='span' color='error' fontSize={13}>این فیلد الزامی است  </Typography>
                    </Grid>
                </Grid>
            </Grid>}

            <Grid item xs={12}>
                <TextInput 
                  name='comment'
                  value={comment}
                  label='توضیحات*'
                  placeholder='لطفا نظر خود را با رعایت ادب و احترام به صورت کامل شرح دهید'
                  onChange={commentHandler}
                  onFocus={focusHandler}
                  onBlur={commentValdator}
                  onKeyUp={commentValdator}
                  error={commentStatus.valid || !active.comment ? false : true}
                  color={commentStatus.valid? 'success' : 'warning'}
                  required
                  errorMessage={commentStatus.message}
                  multiline
                  rows={6}
                />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent='flex-end' >
                <Button variant='contained' color='NavyBlue' size='large' onClick={handleClickOpen} >ارسال دیدگاه</Button>
                <SendPopUp open={open} handleClose={handleClose} mutationStatus={mutationStatus} setMutationStatus={setMutationStatus} mutateForm={mutateForm} />
            </Grid>
        </Grid >
    );
};

export default CommentForm;