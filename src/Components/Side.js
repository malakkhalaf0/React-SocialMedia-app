import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

function Side(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

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
      <Divider />

      <List>
        {['Home', 'Popular Hashtags', 'My Friends', 'Setting'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton sx={{
              '&:hover': {
                '& .MuiListItemIcon-root': {
                  color: '#FBB03B',
                },
                '& .MuiListItemText-primary': {
                  color: '#FBB03B',
                },
              },
            }}>
              <ListItemIcon sx={{ color: '#D9D9D9' }}>{index % 2 === 0 ? <HomeIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} sx={{ color: '#D9D9D9', fontFamily: 'Poppins, sans-serif' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#490057', borderRadius: '0 24px 24px 0' },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#490057', borderRadius: '0 18px 0px 0' },
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













// import * as React from 'react';
// import PropTypes from 'prop-types';
// import './Side.css';

// function Side(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [isClosing, setIsClosing] = React.useState(false);

//   const handleDrawerClose = () => {
//     setIsClosing(true);
//     setMobileOpen(false);
//   };

//   const handleDrawerTransitionEnd = () => {
//     setIsClosing(false);
//   };

//   const drawer = (
//     <div className="drawer">
//       <div className="drawer-header">
//         <button className="icon-button" aria-label="open drawer">
//           {/* Placeholder for an icon */}
//         </button>
//         <h1 className="drawer-title">TrekLink</h1>
//       </div>
//       <div className="toolbar"></div>
//       <div className="divider"></div>
//       <ul className="drawer-list">
//         {['Home', 'Popular Hashtags', 'My Friends', 'Setting'].map((text, index) => (
//           <li key={text} className="drawer-list-item">
//             <button className="list-item-button">
//               <span className={`list-item-icon ${index % 2 === 0 ? 'home-icon' : 'mail-icon'}`}></span>
//               <span className="list-item-text">{text}</span>
//             </button>
//           </li>
//         ))}
//       </ul>
//       <div className="divider"></div>
//     </div>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <div className="drawer-container">
//       <nav className={`drawer-nav ${mobileOpen ? 'drawer-open' : ''}`}>
//         <div className="drawer-overlay" onClick={handleDrawerClose}></div>
//         <div className={`drawer-paper ${isClosing ? 'drawer-closing' : ''}`} onTransitionEnd={handleDrawerTransitionEnd}>
//           {drawer}
//         </div>
//       </nav>
//       <div className="permanent-drawer">
//         {drawer}
//       </div>
//     </div>
//   );
// }

// Side.propTypes = {
//   window: PropTypes.func,
// };

// export default Side;
