import React from 'react';

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {red} from '@mui/material/colors'
import solarDateConvertor from '../../tools/solarDateConverter';
import dateSeprator from '../../tools/dateSeprator';
import { Link, useNavigate } from 'react-router-dom';

const PreviewCard = ({author, title, cover, updatedAt, slug, withoutHeader=false, maxWidth='600px'}) => {
    const navigate= useNavigate()

    return (
        <Card sx={{maxWidth : {maxWidth}, borderRadius: '10px', boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;', ml:'auto'}} >
            {!withoutHeader && 
                <Link style={{textDecoration: 'none', color:'inherit'}} to={`/authors/${author.slug}`} >
                <CardHeader
                    avatar={
                        cover.url?
                        <Avatar alt={author.name} src={author.avatar.url} sx={{marginLeft: '10px'}} />
                        :
                        <Avatar sx={{bgcolor: red[500], marginLeft:'20px' }} aria-label='recipe'>{author.name.split('')[0]}</Avatar>
                    }
                    title={author.name}
                    action={
                        <IconButton aria-label="settings">
                        <MoreVertIcon />
                        </IconButton>
                    }
                    subheader={solarDateConvertor(...dateSeprator(updatedAt))}
                    
                />
                </Link>
            }
            <CardMedia
                component='img'
                height='194'
                image={cover.url}
                alt={title}
            />
            <CardContent  >
                <Typography variant='body1' height='70px' overflow='hidden' component='h3' color='text.secondary' textAlign='right'>{title}</Typography>
            </CardContent>
            <Divider variant='middle' />
            <CardActions>
                <Button variant='contained' color='NavyBlue' fullWidth onClick={()=> navigate(`/posts/${slug}`)}>مطالعه بیشتر</Button>
            </CardActions>
            
        </Card>
    );
};

export default PreviewCard;