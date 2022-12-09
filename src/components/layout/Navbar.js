import React from 'react';
import { AppBar, Container, Toolbar, Typography, Box, Button, IconButton, Menu, MenuItem, Tooltip, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { styled } from '@mui/material/styles';

const Navbar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const pages= ['صفحه اصلی', 'پست ها' , 'نویسنده ها']
    const settings= ['داشبورد']

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };

      const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      }));



    return (
        <AppBar color='BurntOrange' >
            <Container maxWidth='xl' >
                <Toolbar disableGutters>
                    <Typography variant='h4' component='p' fontFamily='Galey' fontWeight={900} color='white' sx={{display: { xs: 'none', md: 'flex' }}} >BlogChi</Typography>
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
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    sx={{padding: '0', display:{xs: 'flex' , md: 'none'}}}
                    
                    >
                        <MenuIcon />
                    </IconButton>

                    <Drawer
                        variant="temporary"
                        anchor="right"
                        open={anchorElNav}
                        sx={{width:'500px', padding:'100px'}}
                    >
                        <DrawerHeader>
                            <IconButton onClick={handleCloseNavMenu}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <List sx={{width:'250px'}} >
                            <ListItem disablePadding >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HomeIcon/>
                                    </ListItemIcon>
                                    <ListItemText sx={{display:'flex', justifyContent:'flex-start'}} ><Typography>صفحه اصلی</Typography></ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton  sx={{display:'flex', justifyContent:'space-between'}}>
                                    <ListItemIcon >
                                        <ChromeReaderModeIcon/>
                                    </ListItemIcon>
                                    <ListItemText sx={{display:'flex', justifyContent:'flex-start'}} ><Typography>پست ها</Typography></ListItemText>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DriveFileRenameOutlineIcon/>
                                    </ListItemIcon>
                                    <ListItemText sx={{display:'flex', justifyContent:'flex-start'}} ><Typography>نویسنده ها</Typography></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Drawer>
                    
                    <Box
                    sx={{
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,              
                    }}
                    >
                        <Typography mx='auto' variant='h4'  fontFamily='Galey' fontWeight={900} color="white" >BlogChi</Typography>
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