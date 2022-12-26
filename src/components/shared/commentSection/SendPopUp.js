import React from 'react';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SendPopUp = ({open, handleClose, mutationStatus, setMutationStatus, mutateForm}) => {

    const sendComment = ()=>{
        setMutationStatus({
            error: false,
            loading: true,
            published: false,
            called: true
        });
        mutateForm()
    }

    return (
        <div>
            <Dialog
             open={open}
             onClose={handleClose}
             aria-labelledby="alert-dialog-title"
             aria-describedby="alert-dialog-description"
             fullWidth
             maxWidth='sm'
            >
                <DialogTitle id="alert-dialog-title">
                    {
                        !mutationStatus.called? <Typography fontSize='1.2rem' fontWeight={700} >آیا از ارسال نظر خود اطمینان دارید؟</Typography>
                        :
                        mutationStatus.error? <Typography fontSize='1.4rem' color='error.main' fontWeight={900} >خطا!</Typography>
                        :
                        mutationStatus.loading? <Typography fontSize='1.4rem' color='warning.main' fontWeight={900} >در حال ارسال ...</Typography>
                        :
                        <Typography fontSize='1.4rem' color='success.main' fontWeight={900} >ارسال شد!</Typography>
                    }
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    {
                        mutationStatus.called ?
                            <Box
                              display='flex'
                              flexDirection='column'
                              alignItems='center'
                              justifyContent='center'
                              gap={2}
                            >
                                {
                                    mutationStatus.error?
                                        <>
                                            <ErrorOutlineIcon sx={{fontSize: '150px' , color: 'error.main'}} />
                                            <Typography textAlign='center' >فرایند ارسال با مشکل مواجه شد لطفا مجددا تلاش نمایید</Typography>
                                        </>
                                    :mutationStatus.loading?
                                        <>
                                            <CircularProgress color="warning" size={70} />
                                            <Typography textAlign='center' >{mutationStatus.published ? 'در حال انتشار دیدگاه شما' : 'در حال ارسال دیدگاه شما، لطفا منتظر بمانید'}</Typography>
                                        </>
                                    :
                                        <>
                                            <CheckCircleOutlineIcon sx={{fontSize: '150px' , color: 'success.main'}} />
                                            <Typography textAlign='center' >دیدگاه شما با موفقیت ثبت شد و درون سایت قرار گرفت</Typography>
                                        </>
                                }
                            </Box>
                        :
                            <DialogContentText id="alert-dialog-description" >
                            با زدن دکمه ارسال، دیدگاه شما بلافاصله درون سایت منتشر میشود پس قبل از فشرن این دکمه از درستی اطلاعات خود و محتوای ارسالی مطمئن شوید
                            </DialogContentText>
                    }
                </DialogContent>
                <DialogActions sx={{display: 'flex', gap:2}}>
                    {
                        mutationStatus.done? <Button variant='contained' color='NavyBlue' fullWidth onClick={handleClose} autoFocus>تمام!</Button>
                        :
                        <>
                            <Button variant='outlined' color='error' disabled={mutationStatus.loading ? true : false} onClick={handleClose}>بیخیال</Button>
                            <Button variant='contained' color='NavyBlue' disabled={mutationStatus.loading ? true : false} onClick={sendComment} autoFocus>
                                ارسال دیدگاه
                            </Button>
                        </>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SendPopUp;