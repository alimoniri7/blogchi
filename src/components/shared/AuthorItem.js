import { Avatar, Button, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';

const AuthorItem = ({name, avatarURL}) => {
    return (
        <ListItem>
                <Button fullWidth>
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