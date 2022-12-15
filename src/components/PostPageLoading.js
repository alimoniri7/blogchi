import React from 'react';
import { Card, CardHeader, Grid, Skeleton } from '@mui/material';

const PostPageLoading = () => {
    return (
        <Grid container sx={{py:4,px:2, height:'90vh',overflow:'hidden', borderRadius:{xs:'10px', md:'30px'}, boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;'}} >
            <Grid item xs={12} >
                <Skeleton variant="text" sx={{ fontSize: '1.8rem', width:'60%' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.8rem', width:'40%' }} />
            </Grid>
            <Grid item xs={10} md={5}>
                <Card sx={{boxShadow: 'none'}} >                   
                    <CardHeader
                    avatar={
                        <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    }
                    title={
                        <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                    }
                    subheader={
                        <Skeleton animation="wave" height={10} width="40%" />
                    }
                    />
                </Card>
            </Grid>
            <Grid item xs={12} width='100%' display='flex' justifyContent='center' >
                {/* <img src={data.post.cover.url} alt="cover" style={{maxWidth: '90%' , height: 'auto', minWidth: '50%'}} /> */}
                <Skeleton variant="rectangular" width='70%' height='65vh' />
            </Grid>
        </Grid>
    );
};

export default PostPageLoading;