import React from 'react';
import PreviewCard from './shared/PreviewCard';
import Layout from './layout';
import { useQuery } from '@apollo/client';
import { GET_CARD_INFO } from './../services/GraphQL/gqls';
import LoadinCard from './shared/LoadinCard';
import { Container } from '@mui/system';
import { Alert, AlertTitle, Grid } from '@mui/material';

const HomePage = () => {

    const {loading , data, error}= useQuery(GET_CARD_INFO)
    console.log({loading, data});

    return (
        <Layout>
            <Container maxWidth='xl' sx={{marginTop:'100px'}}>
                <Grid container spacing={1}>
                    {error?
                        <Alert severity="error"  >
                            <AlertTitle>خطا!</AlertTitle>
                            {error.message}
                        </Alert>
                    :
                        <>
                            <Grid item xs={3}>

                            </Grid>
                            <Grid item xs={9}>
                                {loading?
                                    <LoadinCard/>
                                :
                                <Grid container spacing={3}>
                                    {data.posts.map(post=> 
                                        <Grid item xs={4} key={post.id} >
                                            <PreviewCard author={post.author} title={post.title} cover={post.cover} updatedAt={post.updatedAt} />
                                        </Grid>
                                    )}
                                </Grid>
                                }
                            </Grid>
                        </>
                    }
                </Grid>
            </Container>
            
        </Layout>
    );
};

export default HomePage;