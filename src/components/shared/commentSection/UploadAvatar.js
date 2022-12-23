import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import { Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Typography } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PanoramaIcon from '@mui/icons-material/Panorama';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box } from '@mui/system';

const DndBox = ({dragStatus, uploadedFile})=>{
  return(
    <Box
    height='300px'
    borderRadius={10}
    sx={{cursor:'pointer'}}
    display='flex'
    px={2}
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    gap={1}
    backgroundColor={uploadedFile.error? 'error.main' : uploadedFile.loading ? 'info.main' : uploadedFile.data ? 'success.main' :  dragStatus? 'secondary.main' : '#4C7C71'}
    >
    {uploadedFile.error?
      <>
        <ErrorOutlineIcon sx={{fontSize: '150px' , color: 'white'}} />
        <Typography color='white' textAlign='center' >ارسال عکس انجام نشد! لطفا مجدد تلاش نمایید</Typography>

      </>
    :uploadedFile.loading?
      <>
        <CircularProgress color="warning" size={70} />
        <Typography color='white' textAlign='center' >لطفا چند لحظه صبر کنید ...</Typography>
      </>
    :uploadedFile.data?
      <>
        <CheckCircleOutlineIcon sx={{fontSize: '150px' , color: 'white'}} />
        <Typography color='white' textAlign='center' >ارسال عکس با موفقیت انجام شد!</Typography>
      </>
    :
      <>
        <PanoramaIcon sx={{fontSize: '150px' , color: 'skyblue'}}/>
        <Typography color='white' textAlign='center' >{dragStatus? 'حالا عکس خود را رها کنید' : 'روی این باکس کلیک کنید یا عکس خود را درون این باکس رها کنید'} </Typography>
      </>
    }
    
  </Box>
  )
}

const UploadAvatar= ()=> {

  const [files, setFiles] = useState([]);
  const [uploadedFile, setUploadedFile] = useState({
    error: false,
    data: null,
    loading: false
  })
  console.log(uploadedFile);
  


  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );

  
      let form = new FormData()
      form.append("fileUpload", acceptedFiles[0])

      setUploadedFile({
        error: false,
        data:null,
        loading: true
      })

      fetch(`${process.env.REACT_APP_GRAPHCMS_URI}/upload`, {
      method: 'POST',
      headers:{"gcms-stage":"PUBLISHED"},
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        setUploadedFile({
          error: false,
          data: {...data},
          loading: false
        })
      })
      .catch((err) => {
        setUploadedFile({
          error: true,
          data: null,
          loading: false
        })
      })

    },
    [setFiles]
  );



  // upload avatar ui functions -------------------------------------------------------------------------------------------------------------------
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{
    setTimeout(() => {
      if(uploadedFile.data) setOpen(false)
    }, 1000);
  }, [uploadedFile.data])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: {
    'image/jpeg': ['.jpg' , '.jpeg'],
    'image/png': ['.png']
  }})


  //-------------------------------------------------------------------------------------------------------------------


  return (


    <div>
      <Box display='flex' gap={2} alignItems='center'>
        <Typography>آواتار :</Typography>
        {uploadedFile.data?
          <Avatar src={uploadedFile.data.url} sx={{width:'100px' , height: '100px'}} />
        :
        <Button sx={{display: 'flex', alignItems: 'center' , gap:1,padding:0, width:'100px', height: '100px' , borderRadius:'1000px', flexDirection:'column'}}  variant='contained' color='NavyBlue' onClick={handleClickOpen}>
          <Typography color='white' fontSize={14}>ارسال عکس</Typography>
          <AddAPhotoIcon fontSize='small' color="white"  sx={{color: 'white'}} />
        </Button>
        }
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm' >
        <DialogTitle>ارسال آواتار</DialogTitle>
        <DialogContent width='100%' >
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <DndBox dragStatus={true} uploadedFile={uploadedFile} />
                :
                  <DndBox dragStatus={false} uploadedFile={uploadedFile} />
              }
            </div>
        </DialogContent>
        <DialogActions>
          <Button fullWidth  variant='contained' color='NavyBlue' disabled={uploadedFile.loading||uploadedFile.data ? true : false} onClick={handleClose}>بیخیال</Button>
        </DialogActions>
      </Dialog>
    </div>







    // <>
    //   <div {...getRootProps()}>
    //     <input {...getInputProps()} />
    //     {
    //       isDragActive ?
    //         <p>Drop the files here ...</p> :
    //         <p>Drag 'n' drop some files here, or click to select files</p>
    //     }
    //   </div>
    //   <div>
    //     {uploadedFile.error? <h2>Something went wrong</h2>
    //     :
    //       <>
    //         {uploadedFile.loading? <h2>Loading</h2>
    //         :
    //         <>{uploadedFile.data && <h1>{uploadedFile.data.id}</h1>}</>
    //         }
    //       </>
    //     }
    //   </div>
    // </>
  )
}

export default UploadAvatar;
