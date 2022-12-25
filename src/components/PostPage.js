import { useQuery } from '@apollo/client';
import { Container, Grid, Alert, AlertTitle, Typography, Card, CardHeader, Avatar, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_POST_DATA } from '../GraphQL/gqls';
import dateSeprator from '../tools/dateSeprator';
import solarDateConvertor from '../tools/solarDateConverter';
import sanitizeHtml from 'sanitize-html';
import './htmlFetchedContent.scss'
import PostPageLoading from './PostPageLoading';
import { Box } from '@mui/system';
import CommentSection from './shared/commentSection/CommentForm';


const PostPage = () => {
    const navigate = useNavigate()
    const { postSlug } = useParams()

    const {loading, data, error } = useQuery(GET_POST_DATA, {
        variables: {
            slug: postSlug 
        }
    })
    // console.log({loading, data, error });




    return (
        <Container maxWidth='lg' sx={{mt:10, padding:0}}  >
            {error?
                <Alert severity="error"  >
                    <AlertTitle>خطا!</AlertTitle>
                    {error.message}
                </Alert>
            :
                <>
                    {loading?
                    <PostPageLoading/>
                    :
                    <>
                        <Grid container sx={{py:4,px:2, borderRadius:{xs:'10px', md:'30px'}, boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;'}} >
                            <Grid item xs={12} >
                                <Typography variant='h4' px={2} component='h1' fontWeight={500} sx={{fontSize:{xs:'1.5rem', sm: '2.1rem'}}} >{data.post.title}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Card sx={{boxShadow: 'none'}} >
                                    <Button onClick={()=> navigate(`/authors/${data.post.author.slug}`)} >
                                    <CardHeader
                                    avatar={
                                        data.post.cover.url?
                                        <Avatar alt={data.post.author.name} src={data.post.author.avatar.url} sx={{marginLeft: '10px',width:'60px', height:'60px'}} />
                                        :
                                        <Avatar sx={{bgcolor: red[500], marginLeft:'20px', width:'100px', height:'100px' }} aria-label='recipe'>{data.post.author.name.split('')[0]}</Avatar>
                                    }
                                    title={
                                        <Typography fontWeight={500} color='grey.800' >نویسنده: {data.post.author.name}</Typography>
                                    }
                                    subheader={
                                        <Typography color='grey.700' textAlign='right' fontWeight='300' variant='body2' >{solarDateConvertor(...dateSeprator(data.post.updatedAt))}</Typography>
                                    }
                                    />
                                    </Button>
                                </Card>
                            </Grid>
                            <Grid item xs={12} width='100%' display='flex' justifyContent='center' >
                                <img src={data.post.cover.url} alt="cover" loading='lazy' style={{maxWidth: '90%' , height: 'auto', minWidth: '50%'}} />
                            </Grid>
                            <Grid item xs={12}>
                                <div
                                dangerouslySetInnerHTML={{
                                    __html:sanitizeHtml(data.post.content.html)
                                }}
                                className='htmlContent'
                                ></div>
                            </Grid>
                        </Grid>
                        
                        {/* comment section ---------------------------------------------------- */}
                        <Box sx={{py:4,px:{xs:2, md: 6},mt:3, borderRadius:{xs:'10px', md:'30px'}, boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;'}}>
                            <CommentSection postSlug={postSlug} />
                        </Box >
                    </>
                    }
                </>
            }
        </Container>
    );
};

export default PostPage;