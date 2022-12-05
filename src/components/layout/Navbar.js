import React from 'react';
import { AppBar, Container, Toolbar, Typography, Box, Button, Avatar, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const pages= ['صفحه اصلی', 'پست ها' , 'نویسنده ها']
    const settings= ['داشبورد']

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    return (
        <AppBar color='BurntOrange' >
            <Container maxWidth='xl' >
                <Toolbar disableGutters>
                    <Typography variant='h4' component='p' fontFamily='Galey' fontWeight={900} color='white' >BlogChi</Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mx:3 }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{ my: 2,mx: .5, color: 'white', display: 'block', fontSize:16, fontWeight:'700' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <AccountCircleIcon color='DarkBlue' fontSize="large" />
                                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                            </IconButton>
                        </Tooltip>
                        <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;