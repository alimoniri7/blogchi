import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthorItem = ({name, avatarURL, slug}) => {
    const navigate= useNavigate()

    return (
        <ListItem>
                <Button fullWidth onClick={()=>navigate(`/authors/${slug}`)}>
                    <ListItemAvatar>
                        <Avatar alt={name} src={avatarURL} sx={{marginLeft: '10px'}} />
                    </ListItemAvatar>
                    <ListItemText sx={{display:'flex'}}>
                        <Typography variant='body2' component='p' >{name}</Typography>
                    </ListItemText>
                </Button>
            </ListItem>
    );
};

export default AuthorItem;