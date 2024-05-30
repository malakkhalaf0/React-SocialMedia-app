import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { styled } from '@mui/material/styles';

const drawerWidth = 90;

const CustomListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: '#D9D9D9',
  justifyContent: 'center',
}));

function SideChat(props) {
  const { window } = props;
  const location = useLocation(); // Use useLocation hook to get the current path
  const [mobileOpen, setMobileOpen] = useState(false);
  const userId = localStorage.getItem('userId');

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const drawer = (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <h1 style={{ color: '#FBB03B', fontFamily: 'Poppins, sans-serif', fontSize: '24px' }}>
          TL
        </h1>
      </Box>
      <Divider />
      <List>
        {[
          { icon: <HomeIcon />, link: '/home' },
          { icon: <TrendingUpIcon />, link: '/popular-hashtags' },
          { icon: <PeopleIcon />, link: '/FriendsPosts' },
     
          { icon: <ChatIcon />, link: '/chat' },
          { icon: <SettingsIcon />, link: `/users/${userId}` }
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              sx={{
                justifyContent: 'center',
                minHeight: 56,
                '&:hover': {
                  '& .MuiListItemIcon-root': {
                    color: '#FBB03B',
                  },
                },
                '& .MuiListItemIcon-root': {
                  color: location.pathname === item.link ? '#FBB03B' : '#D9D9D9',
                },
              }}
            >
              <CustomListItemIcon>
                {item.icon}
              </CustomListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            bgcolor: 'linear-gradient(to bottom, #1E3C72, #2A5298)', 
            color: '#FFF',
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor:'#490057'
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            bgcolor: 'linear-gradient(to bottom, #1E3C72, #2A5298)', 
            color: '#FFF',
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor:'#490057'
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

SideChat.propTypes = {
  window: PropTypes.func,
};

export default SideChat;
