import { useQuery } from '@apollo/client';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_AHTHOR_DETAILS } from '../GraphQL/gqls';
import dateSeprator from '../tools/dateSeprator';
import solarDateConvertor from '../tools/solarDateConverter';
import PostPageLoading from './PostPageLoading';
import ShowError from './shared/ShowError';
import sanitizeHtml from 'sanitize-html';
import './htmlFetchedContent.scss'
import AuthorPostsSection from './shared/AuthorPostsSection';



const AuthorDetailPage = () => {
    const {authorSlug} = useParams()
    const {loading , data , error} = useQuery(GET_AHTHOR_DETAILS, {
        variables: {slug: authorSlug}
    })

    if(error) return <Container maxWidth='lg' sx={{mt:10}}><ShowError error={error.message}/></Container> 
    if(loading) return <Container maxWidth='lg' sx={{mt:10}}><PostPageLoading/></Container>
    
    const {name, avatar, biography, profession, createdAt} = data.author
    console.log(solarDateConvertor(dateSeprator(createdAt)));

    return (
        <Container maxWidth='lg' sx={{mt:12}}>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Avatar
                src={avatar.url}
                sx={{width: '200px', height: '200px'}}
                />
                <Typography variant='body1' component='h5' fontSize={{xs: '2rem'}} mt={1} >{name}</Typography>
                <Typography variant='body2' component='span' color='grey.700' fontSize={{md:'1.2rem'}} >{profession} {'\xa0\xa0\xa0'}|  {'\xa0\xa0\xa0'} عضویت از{'\xa0\xa0'} {solarDateConvertor(...dateSeprator(createdAt))}</Typography>
            </Box>
            <Box>
                <div
                dangerouslySetInnerHTML={{
                    __html:sanitizeHtml(biography.html)
                }}
                className='htmlContent'
                >
  
                </div>
            </Box>
            <Divider variant='fullWidth'/>
            <Divider variant='fullWidth'/>
            <Divider variant='fullWidth'/>
            <Divider variant='fullWidth'/>
            
            <Box mt={4} >
                <AuthorPostsSection authorSlug={authorSlug} />
            </Box>
        </Container>
    );
};

export default AuthorDetailPage;