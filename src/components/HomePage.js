import React from 'react';
import PreviewCard from './shared/PreviewCard';
import { useQuery } from '@apollo/client';
import { GET_AUTHOR_PREVIEW, GET_CARD_INFO } from '../GraphQL/gqls';
import LoadinCard from './shared/LoadinCard';
import { Container } from '@mui/system';
import { Alert, AlertTitle, Divider, Grid, List, ListSubheader, Typography } from '@mui/material';
import AuthorItem from './shared/AuthorItem';
import AuthorItemLoading from './shared/AuthorItemLoading';

const HomePage = () => {

    const {loading , data, error}= useQuery(GET_CARD_INFO)
    const authorsRes = useQuery(GET_AUTHOR_PREVIEW)
    console.log({loading, data});

    return (
        <>
            <Container maxWidth='xl' sx={{marginTop:'100px'}}>
                <Grid container spacing={3}>
                    {error?
                        <Alert severity="error"  >
                            <AlertTitle>خطا!</AlertTitle>
                            {error.message}
                        </Alert>
                    :
                        <>
                            <Grid item xs={12} md={3} >
                                {authorsRes.error?
                                    <Alert severity="error"  >
                                        <AlertTitle>خطا!</AlertTitle>
                                        {error.message}
                                    </Alert>
                                :
                                    <List sx={{borderRadius: '10px', boxShadow:'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;'}}       
                                        subheader={
                                            <>
                                                <ListSubheader component="div" id="nested-list-subheader">
                                                    نویسنده ها
                                                </ListSubheader>
                                                <Divider/>  
                                            </>
                                        }
                                    >
                                        {authorsRes.loading?
                                            <>
                                             {[10,20,30,40].map(item=> <AuthorItemLoading key={item}/>) }
                                            </>
                                        :
                                            <>
                                                {authorsRes.data.authors.map((post, index)=>
                                                    <React.Fragment key={post.id} >
                                                        <AuthorItem name={post.name} avatarURL={post.avatar.url}/>
                                                        {
                                                            index!== authorsRes.data.authors.length-1 && <Divider variant='middle' />
                                                        }
                                                    </React.Fragment>
                                                )}
                                            </>
                                        } 
                                    </List>                                   
                                }
                            </Grid>
                            <Grid item xs={12} md={9}>
                                {loading?
                                    <Grid container  spacing={3}>
                                        {[0,1,2,3,4,5].map(item=> <Grid item xs={12} lg={4} sm={6} key={item}><LoadinCard/></Grid>)}
                                    </Grid>
                                :
                                <Grid container spacing={3}>
                                    <Grid item xs={12} >
                                        <Typography variant='h5' component='h3' mr={2} pb={1} >پست ها</Typography>
                                        <Divider variant='inset' />
                                    </Grid>
                                    {data.posts.map(post=> 
                                        <Grid item  xs={12} lg={4} sm={6} key={post.id} >
                                            <PreviewCard author={post.author} title={post.title} cover={post.cover} updatedAt={post.updatedAt} slug={post.slug} />
                                        </Grid>
                                    )}
                                </Grid>
                                }
                            </Grid>
                        </>
                    }
                </Grid>
            </Container>
        </>
    );
};

export default HomePage;

