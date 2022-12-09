import { ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';
import React from 'react';

const AuthorItemLoading = () => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
            </ListItemAvatar>
            <ListItemText>
                <Skeleton
                    animation="wave"
                    height={10}
                    width="80%"
                    />
            </ListItemText>
        </ListItem>
    );
};

export default AuthorItemLoading;