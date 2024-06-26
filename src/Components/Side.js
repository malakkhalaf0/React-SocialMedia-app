import * as React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

function Side(props) {
  const { window } = props;
  const location = useLocation(); // Use useLocation hook to get the current path
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const userId = localStorage.getItem('userId');

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const drawer = (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2, color: '#D9D9D9' }}
        >
        </IconButton>
        <h1 style={{ color: '#FBB03B', fontFamily: 'Poppins, sans-serif' }}>
          TrekLink
        </h1>
      </Box>
      <Toolbar />
      <List>
        {[
          { text: 'Home', icon: <HomeIcon />, link: '/home' },
          {},
          { text: 'Popular Hashtags', icon: <TrendingUpIcon />, link: '/popular-hashtags' },
        {},
          { text: 'Following', icon: <PeopleIcon />, link: '/FriendsPosts' },
          {},
          { text: 'Chat', icon: <ChatIcon />, link: '/chat' },
          {},
          { text: 'Setting', icon: <SettingsIcon />, link: `/users/${userId}` }
        ].map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              sx={{
                '&:hover': {
                  '& .MuiListItemIcon-root': {
                    color: '#FBB03B',
                  },
                  '& .MuiListItemText-primary': {
                    color: '#FBB03B',
                  },
                },
                '& .MuiListItemIcon-root': {
                  color: location.pathname === item.link ? '#FBB03B' : '#D9D9D9',
                },
                '& .MuiListItemText-primary': {
                  color: location.pathname === item.link ? '#FBB03B' : '#D9D9D9',
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.link ? '#FBB03B' : '#D9D9D9' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: location.pathname === item.link ? '#FBB03B' : '#D9D9D9', fontFamily: 'Poppins, sans-serif' }} />
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
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', bgcolor: '#490057', borderRadius: '0 24px 24px 0' },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', bgcolor: '#490057', borderRadius: '0 18px 0px 0' },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

Side.propTypes = {
  window: PropTypes.func,
};

export default Side;