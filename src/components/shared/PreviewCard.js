import React from 'react';

import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {red} from '@mui/material/colors'
import solarDateConvertor from '../../tools/solarDateConverter';
import dateSeprator from '../../tools/dateSeprator';

const PreviewCard = ({author, title, cover, updatedAt}) => {

    console.log(updatedAt);
    return (
        <Card sx={{maxWidth : '600px', borderRadius: '10px', boxShadow: 'rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;'}} >
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
            <CardMedia
                component='img'
                height='194'
                image={cover.url}
                alt={title}
            />
            <CardContent  >
                <Typography variant='body1' height='70px' overflow='hidden' component='h3' color='text.secondary'>{title}</Typography>
            </CardContent>
            <Divider variant='middle' />
            <CardActions>
                <Button variant='outlined' fullWidth>مطالعه بیشتر</Button>
            </CardActions>
            
        </Card>
    );
};

export default PreviewCard;